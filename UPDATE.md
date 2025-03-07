# Update history

- 2025-03-07
  - prisma custom generator 제작
    - 테이블 엔티티 제작
    - 제작 이유는 기존 prisma-class-generator의 잘못된 동작
      - default가 있는데도 어설션이 추가되는 문제
      - default값이 1일 때 new Date(1)로 표기되는 버그
  - docs 테스트
    - vitest test provider istanbul 실행 시 예외 디렉토리 파일 실행되는 버그 (vitest:*-transform)
      - V8로 변경
- 2025-03-06
  - 초기화 커밋
  - 템플릿 가져오기
