-- ============================================================
-- 모아루니 준비: 후앤모아와 같은 코드를 쓰기 위해 모아루니에 없는 칸만 "추가"
-- * 기존 상품·주문 데이터는 바꾸지 않습니다. (칸 추가 + 비어 있는 설정 칸에 기본값)
-- * 가장 먼저 1번만 실행 (다시 실행해도 안전)
-- Supabase 대시보드 > SQL Editor 에 전체 붙여넣고 Run
-- ============================================================

-- 1) 상품: 판매 여부 칸 (후앤모아에는 있음, 모두 "판매중"으로 시작)
alter table public.products add column if not exists is_active boolean default true;

-- 2) 쇼핑몰 설정: 상호·1:1 채팅 주소·배송비 칸 (관리자 > 설정에서 변경)
alter table public.store_settings add column if not exists shop_name    text default 'Moaruni';
alter table public.store_settings add column if not exists shop_name_kr text default '모아루니';
alter table public.store_settings add column if not exists kakao_url    text default 'https://open.kakao.com/o/s9kAMwNi';
alter table public.store_settings add column if not exists shipping_fee integer default 3500;
update public.store_settings
   set shop_name = coalesce(shop_name, 'Moaruni'),
       shop_name_kr = coalesce(shop_name_kr, '모아루니'),
       kakao_url = coalesce(kakao_url, 'https://open.kakao.com/o/s9kAMwNi'),
       shipping_fee = coalesce(shipping_fee, 3500);

-- 3) 확인용
select (select count(*) from public.products) as 상품, (select count(*) from public.products where is_active) as 판매중,
       shop_name, shop_name_kr, kakao_url, shipping_fee, bank_name
from public.store_settings;
