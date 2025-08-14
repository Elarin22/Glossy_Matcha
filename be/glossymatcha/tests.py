from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from decimal import Decimal
from datetime import date, timedelta
from rest_framework.test import APITestCase
from rest_framework import status

from .models import (
    Products, ProductImages, ProductSpecifications,
    Inquiries, Staff, WorkRecord, DailySales, Sales, YearlySales, Suppliers
)
from .forms import StaffForm, WorkRecordForm, SuppliersForm, DailySalesForm, SalesForm, YearlySalesForm


class ProductModelTest(TestCase):
    def setUp(self):
        self.product = Products.objects.create(
            name="말차 라떼",
            name_en="Matcha Latte",
            description="진한 말차의 맛",
            description_en="Rich matcha flavor"
        )

    def test_product_creation(self):
        self.assertEqual(self.product.name, "말차 라떼")
        self.assertEqual(self.product.name_en, "Matcha Latte")
        self.assertTrue(self.product.created_at)

    def test_product_str_method(self):
        self.assertEqual(str(self.product), "말차 라떼")

    def test_product_validation_requires_name_or_name_en(self):
        product = Products(
            description="설명만 있음",
            description_en="Only description"
        )
        with self.assertRaises(ValidationError):
            product.clean()

    def test_product_validation_requires_description(self):
        product = Products(
            name="제품명만 있음",
            name_en="Only name"
        )
        with self.assertRaises(ValidationError):
            product.clean()


class InquiryModelTest(TestCase):
    def setUp(self):
        self.inquiry = Inquiries.objects.create(
            name="김철수",
            email="test@example.com",
            inquiry_type="general",
            message="문의 내용입니다."
        )

    def test_inquiry_creation(self):
        self.assertEqual(self.inquiry.name, "김철수")
        self.assertEqual(self.inquiry.email, "test@example.com")
        self.assertEqual(self.inquiry.inquiry_type, "general")

    def test_inquiry_str_method(self):
        self.assertEqual(str(self.inquiry), "김철수 - 일반 문의")


class StaffModelTest(TestCase):
    def setUp(self):
        self.staff = Staff.objects.create(
            name="홍길동",
            nickname="Hong",
            employee_type="full_time",
            hire_date=date.today(),
            resident_number="1234567890123",
            contact="010-1234-5678"
        )

    def test_staff_creation(self):
        self.assertEqual(self.staff.name, "홍길동")
        self.assertEqual(self.staff.employee_type, "full_time")
        self.assertTrue(self.staff.is_active)

    def test_staff_is_active_property(self):
        self.assertTrue(self.staff.is_active)
        
        self.staff.employee_type = "resigned"
        self.staff.save()
        self.assertFalse(self.staff.is_active)

    def test_staff_resident_number_validation(self):
        staff = Staff(
            name="테스트",
            employee_type="full_time",
            hire_date=date.today(),
            resident_number="12345",
            contact="010-1234-5678"
        )
        with self.assertRaises(ValidationError):
            staff.clean()


class WorkRecordModelTest(TestCase):
    def setUp(self):
        self.staff = Staff.objects.create(
            name="홍길동",
            employee_type="full_time",
            hire_date=date.today(),
            resident_number="1234567890123",
            contact="010-1234-5678"
        )
        self.work_record = WorkRecord.objects.create(
            staff=self.staff,
            total_hours=Decimal('160'),
            pay_period_weeks=Decimal('4.0'),
            hourly_rate=Decimal('10000')
        )

    def test_work_record_creation(self):
        self.assertEqual(self.work_record.staff, self.staff)
        self.assertEqual(self.work_record.total_hours, Decimal('160'))

    def test_work_record_auto_calculation(self):
        self.assertEqual(self.work_record.monthly_salary, Decimal('1600000'))
        self.assertTrue(self.work_record.weekly_holiday_allowance > 0)
        self.assertEqual(self.work_record.total_payment, 
                        self.work_record.monthly_salary + self.work_record.weekly_holiday_allowance)


class DailySalesModelTest(TestCase):
    def setUp(self):
        self.daily_sales = DailySales.objects.create(
            date=date.today(),
            offline_sales=Decimal('50000'),
            other_sales=Decimal('10000')
        )

    def test_daily_sales_creation(self):
        self.assertEqual(self.daily_sales.offline_sales, Decimal('50000'))
        self.assertEqual(self.daily_sales.total_sales, Decimal('60000'))

    def test_daily_sales_str_method(self):
        expected = f"{date.today()} - 총매출: 60,000원"
        self.assertEqual(str(self.daily_sales), expected)


class SalesModelTest(TestCase):
    def setUp(self):
        self.daily_sales = DailySales.objects.create(
            date=date.today(),
            offline_sales=Decimal('50000'),
            other_sales=Decimal('10000')
        )
        self.sales = Sales.objects.create(
            year=date.today().year,
            month=date.today().month,
            material_cost=Decimal('20000'),
            labor_cost=Decimal('15000')
        )

    def test_sales_creation(self):
        self.assertEqual(self.sales.year, date.today().year)
        self.assertEqual(self.sales.material_cost, Decimal('20000'))

    def test_sales_property_calculations(self):
        self.assertEqual(self.sales.total_sales, Decimal('60000'))
        self.assertEqual(self.sales.total_cost, Decimal('35000'))
        self.assertEqual(self.sales.gross_profit, Decimal('25000'))


class SuppliersModelTest(TestCase):
    def setUp(self):
        self.supplier = Suppliers.objects.create(
            name="글로시 공급업체",
            contact_person="김담당",
            email="supplier@example.com",
            payment_method="transfer"
        )

    def test_supplier_creation(self):
        self.assertEqual(self.supplier.name, "글로시 공급업체")
        self.assertEqual(self.supplier.payment_method, "transfer")
        self.assertTrue(self.supplier.is_active)

    def test_supplier_str_method(self):
        self.assertEqual(str(self.supplier), "글로시 공급업체 (김담당)")


class StaffFormTest(TestCase):
    def test_valid_staff_form(self):
        form_data = {
            'name': '홍길동',
            'nickname': 'Hong',
            'employee_type': 'full_time',
            'hire_date': date.today().strftime('%Y-%m-%d'),
            'resident_number': '1234567890123',
            'contact': '010-1234-5678',
            'memo': '테스트 직원'
        }
        form = StaffForm(data=form_data)
        if not form.is_valid():
            print("Form errors:", form.errors)
        self.assertTrue(form.is_valid())

    def test_invalid_resident_number(self):
        form_data = {
            'name': '홍길동',
            'employee_type': 'full_time',
            'hire_date': date.today().strftime('%Y-%m-%d'),
            'resident_number': '12345',
            'contact': '010-1234-5678'
        }
        form = StaffForm(data=form_data)
        self.assertFalse(form.is_valid())
        self.assertIn('resident_number', form.errors)


class SalesFormTest(TestCase):
    def setUp(self):
        DailySales.objects.create(
            date=date.today(),
            offline_sales=Decimal('50000')
        )

    def test_valid_sales_form(self):
        form_data = {
            'year': date.today().year,
            'month': date.today().month,
            'material_cost': 20000,
            'labor_cost': 15000
        }
        form = SalesForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_sales_form_without_daily_sales(self):
        form_data = {
            'year': 2023,
            'month': 1,
            'material_cost': 20000
        }
        form = SalesForm(data=form_data)
        self.assertFalse(form.is_valid())


class InquiryAPITest(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='testpass123'
        )

    def test_create_inquiry_api(self):
        url = reverse('create_inquiry')
        data = {
            'name': '김고객',
            'email': 'customer@example.com',
            'inquiry_type': 'general',
            'message': 'API 테스트 문의입니다.'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_inquiry_list_api_requires_admin(self):
        url = reverse('get_inquiries')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProductAPITest(APITestCase):
    def setUp(self):
        self.product = Products.objects.create(
            name="말차 라떼",
            name_en="Matcha Latte",
            description="진한 말차",
            description_en="Rich matcha"
        )

    def test_product_list_api(self):
        url = reverse('product_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])

    def test_product_detail_api(self):
        url = reverse('product_detail', kwargs={'pk': self.product.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])


class DashboardViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.client = Client()

    def test_dashboard_requires_login(self):
        url = reverse('dashboard')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 302)

    def test_dashboard_with_login(self):
        self.client.login(username='testuser', password='testpass123')
        url = reverse('dashboard')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class StaffViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.staff = Staff.objects.create(
            name="홍길동",
            employee_type="full_time",
            hire_date=date.today(),
            resident_number="1234567890123",
            contact="010-1234-5678"
        )
        self.client = Client()
        self.client.login(username='testuser', password='testpass123')

    def test_staff_list_view(self):
        url = reverse('staff_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.staff.name)

    def test_staff_detail_view(self):
        url = reverse('staff_detail', kwargs={'pk': self.staff.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class ExcelExportTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.sales = Sales.objects.create(
            year=2024,
            month=1,
            material_cost=Decimal('20000')
        )
        self.client = Client()
        self.client.login(username='testuser', password='testpass123')

    def test_monthly_sales_excel_export(self):
        url = reverse('monthly_sales_excel_export')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response['Content-Type'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
