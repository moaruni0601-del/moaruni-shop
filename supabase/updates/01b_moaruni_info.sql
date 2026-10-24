-- ============================================================
-- 모아루니 가게 정보 넣기 (updates/01_batch1_settings.sql 실행 뒤)
-- * 쇼핑몰 맨 아래 사업자 정보 · 신상 소식방 주소. 이후에는 관리자 > 설정 > 쇼핑몰 정보에서 변경
-- * 통신판매업 신고번호: 아직 없음 (신고 후 관리자 화면에서 입력)
-- ============================================================
update public.store_settings
   set biz_owner = '이시형',
       biz_number = '588-10-03113',
       ecommerce_number = null,
       biz_email = 'moaruni0601@gmail.com',
       community_url = 'https://open.kakao.com/o/s9kAMwNi';

-- 관리자 로그인 이메일 등록 (Authentication > Users 에 같은 이메일 계정을 먼저 만들어 둘 것)
insert into public.admin_users(email) values ('moaruni0601@gmail.com') on conflict do nothing;

select shop_name_kr, biz_owner, biz_number, ecommerce_number, biz_email, community_url, kakao_url,
       (select string_agg(email, ', ') from public.admin_users) as 관리자
from public.store_settings;
