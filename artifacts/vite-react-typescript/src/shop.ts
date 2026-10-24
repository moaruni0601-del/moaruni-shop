// 🏪 가게별 설정 — 후앤모아·모아루니는 App.tsx 가 똑같고 이 파일만 다릅니다.
//    (상호·대표자·사업자 정보·계좌·채팅 주소는 관리자 > 설정에서 바꾸고, 여기는 처음 기본값과 색상만)
export const SHOP = {
  nameEn: 'Moaruni',
  nameKr: '모아루니',
  orderPrefix: 'MR', // 주문번호 앞글자 (supabase create_order 와 같아야 함)
  siteUrl: 'https://moaruni-shop.web.app',
  kakaoUrl: 'https://open.kakao.com/o/s9kAMwNi', // 1:1 채팅 (설정에서 변경)
  communityUrl: 'https://open.kakao.com/o/s9kAMwNi', // 📢 신상 소식방 (설정에서 변경)
  // 📱 아이폰 기린 수집기 단축어 iCloud 링크 (있으면 관리자 수집함에 [단축어 추가하기] 버튼)
  iosShortcutUrl: 'https://www.icloud.com/shortcuts/39e27baf44804f448fc6b29fb22afe16',
  shippingFee: 3500,
  introMain: '매일매일 입고 싶은 옷,\n고민 없이 모아루니 🎈',
  introSub: '편안함에 감성을 더한\n우리 아이 맞춤 옷장🎀',
  theme: {
    primary: '#D29C8B',
    primaryLight: '#F7EBE1',
    bg: '#FAF6F0',
    text: '#4A3D36',
    subText: '#8E7B71',
    border: '#E8DED7',
    brown: '#7A5B4C'
  }
};
