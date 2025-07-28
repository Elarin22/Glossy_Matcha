# 백엔드
- 들여쓰기 레벨당 공백 **4**
- 줄바꿈 기능 **79자**
- **콜론 앞**에는 공백 X
- **괄호, 대괄호, 중괄호 안**에 불필요한 공백 X
- **마지막 쉼표, 그 뒤의 닫는 괄호 사이** 불필요한 공백 X
- 유형 주석과 기본값이 모두 있는 인수에 대해서만 = 공백 을 사용

<u>옳은 예시</u>
```
def func(a: int = 0) -> int:
  ...
```
<u>옳지 않은 예시</u>
```
def func(a:int=0) -> int:
  ...
```
- 함수 이름은 **소문자**로 작성
- except 예외 작성 시 **구체적인 예외 언급**
```
ex) try:
        import platform_specific_module
     except ImportError:
        platform_specific_module = None
```
- import x 는 **패키지와 모듈을 가져오는 데 사용**합니다 .
  - 여기서 from x import y는 **x패키지 접두사**이고 **y는 접두사가 없는 모듈 이름**입니다.
  - from x import y as z다음의 상황에서 사용하세요 :
    - 명명된 두 개의 모듈을 y가져와야 합니다.
    - y현재 모듈에 정의된 최상위 이름과 충돌합니다.
    - y공개 API의 일부인 일반 매개변수 이름과 충돌합니다(예: features).
    - y불편할 정도로 긴 이름이에요.
    - y코드 컨텍스트에서 너무 일반적입니다(예: from storage.file_system import options as fs_options).
- 표준 약어(예: ) 인 import y as z경우에만 사용하세요 .zimport numpy as np
- **예외**는 특정 조건을 따라야 합니다.
  - 필요한 경우 내장 예외 클래스를 활용하세요. 예를 들어, ValueError함수 인수의 유효성을 검사할 때 발생할 수 있는 전제 조건 위반과 같은 프로그래밍 오류를 나타내기 위해 a를 발생시킵니다.
  - assert조건문이나 검증 전제조건 대신 명령문을 사용하지 마세요 . 이러한 명령문은 애플리케이션 로직에 필수적이어서는 안 됩니다. assert코드 손상 없이 제거될 수 있는지가 시금석이 될 수 있습니다. assert조건문은 평가가 보장되지 않습니다 . PyTest 기반 테스트의 경우, assert는 예상 결과를 검증하는 데 적합하며, 를 사용할 수 있습니다. 예를 들어 다음과 같습니다.

<u>옳은 예시</u>
```
  def connect_to_next_port(self, minimum: int) -> int:
    """Connects to the next available port.

    Args:
      minimum: A port value greater or equal to 1024.

    Returns:
      The new minimum port.

    Raises:
      ConnectionError: If no available port is found.
    """
    if minimum < 1024:
      # Note that this raising of ValueError is not mentioned in the doc
      # string's "Raises:" section because it is not appropriate to
      # guarantee this specific behavioral reaction to API misuse.
      raise ValueError(f'Min. port must be at least 1024, not {minimum}.')
    port = self._find_next_open_port(minimum)
    if port is None:
      raise ConnectionError(
          f'Could not connect to service on port {minimum} or higher.')
    # The code does not depend on the result of this assert.
    assert port >= minimum, (
        f'Unexpected port {port} when minimum was {minimum}.')
    return port
```
<u>옳지 않은 예시</u>
```
  def connect_to_next_port(self, minimum: int) -> int:
    """Connects to the next available port.

    Args:
      minimum: A port value greater or equal to 1024.

    Returns:
      The new minimum port.
    """
    assert minimum >= 1024, 'Minimum port must be at least 1024.'
    # The following code depends on the previous assert.
    port = self._find_next_open_port(minimum)
    assert port is not None
    # The type checking of the return statement relies on the assert.
    return port
```
- 클래스는 클래스 정의 아래에 클래스를 설명하는 docstring을 포함해야 합니다
  - 모든 클래스 docstring은 클래스 인스턴스가 무엇을 나타내는지 설명하는 한 줄 요약으로 시작해야 합니다.
    - 즉, docstring의 하위 클래스 Exception 도 예외가 발생하는 컨텍스트가 아닌, 예외가 무엇을 나타내는지 설명해야 합니다.
    - 클래스 docstring에는 클래스가 클래스라는 것과 같은 불필요한 정보를 반복해서는 안 됩니다.

<u>옳은 예시</u>
```
class CheeseShopAddress:
  """The address of a cheese shop.

  ...
  """

class OutOfCheeseError(Exception):
  """No more cheese is available."""
```
<u>옳지 않은 예시</u>
```
class CheeseShopAddress:
  """Class that describes the address of a cheese shop.

  ...
  """

class OutOfCheeseError(Exception):
  """Raised when no more cheese is available."""
```
- 파일 내에서 문자열 따옴표를 선택할 때는 일관성을 유지해야 합니다.
  -  ' 또는 "을 선택하고 고수
- 오류 메시지(예: 예외에 대한 메시지 문자열 ValueError또는 사용자에게 표시되는 메시지)는 다음 세 가지 지침을 따라야 합니다.
  - 메시지는 실제 오류 조건과 정확히 일치해야 합니다.
  - 보간된 부분은 항상 명확하게 식별 가능해야 합니다.
  - 간단한 자동화된 처리(예: grepping)를 허용해야 합니다.

<u>옳은 예시</u>
```
if not 0 <= p <= 1:
  raise ValueError(f'Not a probability: {p=}')

try:
  os.rmdir(workdir)
except OSError as error:
  logging.warning('Could not remove directory (reason: %r): %r',
                    error, workdir)
```
<u>옳지 않은 예시</u>
```
if p < 0 or p > 1:  # PROBLEM: also false for float('nan')!
  raise ValueError(f'Not a probability: {p=}')

try:
  os.rmdir(workdir)
except OSError:
  # PROBLEM: Message makes an assumption that might not be true:
  # Deletion might have failed for some other reason, misleading
  # whoever has to debug this.
  logging.warning('Directory already was deleted: %s', workdir)

try:
  os.rmdir(workdir)
except OSError:
  # PROBLEM: The message is harder to grep for than necessary, and
  # not universally non-confusing for all possible values of `workdir`.
  # Imagine someone calling a library function with such code
  # using a name such as workdir = 'deleted'. The warning would read:
  # "The deleted directory could not be deleted."
  logging.warning('The %s directory could not be deleted.', workdir)
```
- 코드 검토용으로 커밋하기 전에 간단한 문제를 확인함으로써 검토자는 변경 사항 자체에 집중 가능, CI 실행 횟수도 줄일 수 있음
  - <u>이미 설치 해놨음</u>
```
pip install pre-commit
```
## 모델 스타일
- 필드 이름은 모두 소문자여야 하며, camelCase 대신 밑줄을 사용해야 합니다.

<u>옳은 예시</u>
```
class Person(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)
```
<u>옳지 않은 예시</u>
```
class Person(models.Model):
    FirstName = models.CharField(max_length=20)
    Last_Name = models.CharField(max_length=40)
```
- 필드가 정의된 후에 나타나야 하며 , 필드와 클래스 정의를 구분하는 빈 줄 하나가 있어야 합니다.class Meta
<u>옳은 예시</u>
```
class Person(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)

    class Meta:
        verbose_name_plural = "people"
```
<u>옳지 않은 예시</u>
```
class Person(models.Model):
    class Meta:
        verbose_name_plural = "people"

    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)
```
- 주어진 모델 필드에 대해 choices가 정의된 경우, 각 선택 항목을 매핑으로 정의하고, 모델의 클래스 속성으로 모두 대문자 이름을 지정합니다.

<u>옳은 예시</u>
```
class MyModel(models.Model):
    DIRECTION_UP = "U"
    DIRECTION_DOWN = "D"
    DIRECTION_CHOICES = {
        DIRECTION_UP: "Up",
        DIRECTION_DOWN: "Down",
    }
```

---

# 프론트엔드

1. 파일 및 폴더 네이밍 규칙
- 컴포넌트 파일: PascalCase → ProductList.tsx
- 훅: useXXX → useScroll.ts
- 유틸함수: PascalCase
- 폴더명: `kebab-case`

2. 컴포넌트 명명 규칙
- React 컴포넌트는 PascalCase → ProductCard
- 파일과 컴포넌트 이름 일치 → ProductCard.tsx 안에 ProductCard 정의

3. 함수 / 변수 네이밍 규칙
- 변수/함수: camelCase → productList, getProducts()
- boolean 변수: is, has, can prefix → isLoading, hasError, canSubmit
- 이벤트 핸들러 함수명은 handle로 시작

4. 스타일링 네이밍
- CSS 클래스명: kebab-case 