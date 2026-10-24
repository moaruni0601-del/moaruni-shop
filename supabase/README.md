# 모아루니 — 후앤모아와 같은 방식으로 바꾸기 (적용 순서)

> 코드·기능·관리자 화면은 후앤모아와 **똑같고**, 가게 정보(상호·대표자·사업자·계좌·채팅 주소)만 다릅니다.
> 가게별로 다른 기본값과 색상은 `artifacts/vite-react-typescript/src/shop.ts` 한 파일에만 있습니다.
> 작업 전 백업: 2026-10-24 전체 테이블 (상품 652 · 주문 32 · 주문상품 146 · 분류 51 · 브랜드 8 · 공지 3 · 설정 1)
> → `클로드\모아루니\backups\moaruni-20261024` (고객 이름·전화·주소 포함, 관리 주의)

Supabase 프로젝트: `rtjifxjssyjmhggyhfyj` · Firebase: `moaruni-shop` · 주문번호 앞글자 `MR-`

## 순서 (SQL Editor 에서 하나씩 Run)

| # | 파일 | 하는 일 | 사이트 영향 |
|---|---|---|---|
| 1 | `security/00_moaruni_prepare.sql` | 없는 칸 추가 (상품 판매여부, 상호·채팅·배송비) | 없음 |
| 2 | `security/01_functions.sql` | 주문 생성·조회·수정 함수, 관리자 명단 | 없음 |
| 3 | `updates/01_batch1_settings.sql` → `01b_moaruni_info.sql`(사업자 정보·관리자 이메일) → `02` ~ `05` | 사업자정보·홈배치·품절·정가·카카오알림·새 분류 칸 | 없음 |
| 4 | 관리자 계정 | Authentication → Users → Add user (이메일·비밀번호, Auto Confirm) → `insert into public.admin_users(email) values ('관리자이메일');` / Sign up 허용 끄기 | 없음 |
| 5 | 새 코드 배포 | Replit 빌드 → 테스트 주소 확인 → 실제 배포 | 새 화면 |
| 6 | `security/02_lock_down.sql` | 고객정보·원가 잠금 (새 코드 배포 **뒤**에) | 예전 화면의 관리자 기능 막힘 |
| 7 | 관리자 > 설정 | 사업자 정보 · 소식방 주소 · 계좌 확인, 카카오 알림 연결, 분류 정리 | — |

비상시 되돌리기: `security/03_rollback.sql`
