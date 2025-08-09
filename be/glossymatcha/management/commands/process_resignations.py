from django.core.management.base import BaseCommand
from django.utils import timezone
from glossymatcha.models import Staff


class Command(BaseCommand):
    help = '퇴사일이 도래한 직원들을 자동으로 퇴사 처리합니다.'

    def handle(self, *args, **options):
        today = timezone.now().date()
        
        # 퇴사일이 오늘 이전이거나 오늘이면서 아직 퇴사 처리되지 않은 직원들 찾기
        staff_to_resign = Staff.objects.filter(
            resignation_date__lte=today,
            employee_type__in=['full_time', 'part_time']  # 퇴사가 아닌 상태
        )
        
        resigned_count = 0
        for staff in staff_to_resign:
            # 원래 근무형태 저장
            if not staff.original_employee_type:
                staff.original_employee_type = staff.employee_type
            
            # 퇴사 처리
            staff.employee_type = 'resigned'
            staff.save()
            resigned_count += 1
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'{staff.name} ({staff.nickname}) 직원이 퇴사 처리되었습니다. (퇴사일: {staff.resignation_date})'
                )
            )
        
        if resigned_count == 0:
            self.stdout.write(
                self.style.WARNING('퇴사 처리할 직원이 없습니다.')
            )
        else:
            self.stdout.write(
                self.style.SUCCESS(f'총 {resigned_count}명의 직원이 퇴사 처리되었습니다.')
            )