'use strict';
const { Author } = require('../models');
const CATEGORY = require('../lib/constants/category');
const getRandomInt = require('../lib/getRandomInt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = await Author.findAll({});
    await Promise.all(
      authors.map(async (author) => {
        await author.createArticle({
          headline: '삼성 이건희 회장 유산 기부와 함께 생각해 볼 것들',
          category: CATEGORY.ECONOMY,
          image: 'article/6c815680098e50302d250552888b41cc',
          imageDesc: 'this is image description',
          imageFrom: 'image source',
          briefing: JSON.stringify({
            "time": 1623994461706,
            "blocks":
              [{ "id": "HBC-KsjLLR", "type": "paragraph", "data": { "text": "이건희 삼성전자 회장의 유가족이 이회장의 사재 1조원을 출연해, 감염병 전문병원을 설립하고, 소아암, 희귀질환 어린이를 지원한다고 밝혔다. 더불어, 2만 3천 점에 달하는 미술품을 국가미술관에 기증한다. 유족이 납부해야 할 상속세는 12조원에 달한다. 이건희 회장의" } },
              {
                "id": "ztq1wOr3ks", "type": "image",
                "data":
                {
                  "file":
                  {
                    "url": "https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/article/fded3c3db7c58c5e175460b953cffa84",
                    "name": "fded3c3db7c58c5e175460b953cffa84",
                    "size": 324
                  },
                  "caption": "",
                  "withBorder": false,
                  "stretched": false,
                  "withBackground": false
                }
              }
              ],
            "version": "2.22.0"
          }),
          status: getRandomInt(1, 4),
          paragraphs: JSON.stringify([
            {
              title: '발표내용',
              content: `1. 의료 기부  감염병 극복을 위한 인프라 구축 : 7천억원 - 중앙감염병 전문병원 건축 및 운영 : 5천억원 - 국립감염병연구소 건축 및 제반 연구 지원 : 2천억원  소아암 및 희귀질환 어린이 지원 : 3천억원 2. 미술품 기증  겸재 정선의 '인왕제색도(국보 216호)', 단원 김홍도의 '추성부도'(보물 1393호)등 지정문화재 60건(국보 14건, 보물 46건)과 문화재, 유물·고서·고지도 등 개인 소장 고미술품 2만1천600여점은 국립박물관에 기증.  김환기 화가의 '여인들과 항아리', 이중섭의 '황소' 등 근대 미술품 1천600여점과 모네, 호안 미로, 살바도르 달리, 샤갈, 피카소 등 유명 서양 미술 작품도 국립현대미술관에 기증..  일부 근대 미술 작품은 작가의 연고지 등을 고려해 광주시립미술관, 전남도립미술관, 대구미술관 등 지자체 미술관과 이중섭·미술관 등 작가 미술관에 기증.`
            },
            {
              title: '세간의 평가는',
              content: `- 전무후무한 한국 최대의 기부행위이며, 유족이 꼼수 없이 상속세를 내는 정공법을 선택했다는 평가. - 황희/문화체육관광부 장관 “대한민국 역사상 가장 큰 규모의 문화재와 미술품이 국가에 기증됐습니다. 이는 해외에서도 그 유례를 찾아보기 어려울 정도의 기증 사례로 기록될 것입니다.” - 미술품을 기증받은 국립현대미술관을 단숨에 세계적인 미술관급으로 격상될 정도.`
            },
            {
              title: '맞다! 하지만 잊지마세요.',
              content: ` 의료 사업 기부 1조원의 배경 - 2008년 삼성비자금 특수수사팀이 이건희 회장의 차명계좌와 차명주식 4조 5,000억원을 찾아냄. - 이건희 회장, 배임 및 조세포탈 혐의로 징역 3년, 집행유예 5년 확정. - 2008년 12월 이명박 정부가 이건희 회장의 특별사면 결정함. 삼성은 차명주식 실명으로 전환하며, 양도소득세 등 세금 납부 약속함. - 평가한 세금 탈루액이 1조원 상당. - 13년 뒤인 2021년에 이행하는 것인데, 현재 가치로 9조원 가치에 상당  미술품은 어디서 왔는가? - 2008년 1월 삼성 비자금 특수 수사팀이 삼성에버랜드 물품 창고 압수 수색 과정에서 찾아냄. - 미술품 소유 과정이 불투명하며, 탈루 등 위법성 존재함. - 미술계에서는 이건희 회장의 미술품이 감정가로 2조∼3조원에 이르며, 시가로는 10조원이 넘는 것으로 추정함. - 미술품을 상속할 시, 발생하는 세금을 감면하려는 의도를 의심하는 해석도 있음.`
            }
          ]
          ),
        });
        await author.createArticle({
          headline: '얀센 백신 100만명분 이번주 도착…접종자 인센티브',
          category: CATEGORY.POLITICS,
          image: 'article/fded3c3db7c58c5e175460b953cffa84',
          imageDesc: 'The Wuhan Institute of Virology.',
          imageFrom:
            'Photo: Hector Retamal/AFP via Getty Images The COVID lab-leak theory goes mainstream',
          briefing: JSON.stringify({
            "time": 1623994461706,
            "blocks":
              [{ "id": "HBC-KsjLLR", "type": "paragraph", "data": { "text": "6월 2일 미국정부가 제공한 약 100만 명분의 코로나 19 얀센백신이 우리나라에 들어온다. 지난 22일 바이든 미국 대통령이 한미정상회담에서 문재인 대통령에게 약속한 55만명 분의 두배에 달하는 물량이다. 한편, 백신 접종 인센티브는 6월 1일부터 시행한다." } },
              { "id": "6vHIwtQ9pd", "type": "paragraph", "data": { "text": "1" } },
              { "id": "PwNJFtEhQc", "type": "paragraph", "data": { "text": "2" } },
              {
                "id": "ztq1wOr3ks", "type": "image",
                "data":
                {
                  "file":
                  {
                    "url": "https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/article/fded3c3db7c58c5e175460b953cffa84",
                    "name": "fded3c3db7c58c5e175460b953cffa84",
                    "size": 324
                  },
                  "caption": "",
                  "withBorder": false,
                  "stretched": false,
                  "withBackground": false
                }
              }
              ],
            "version": "2.22.0"
          }),
          status: getRandomInt(1, 4),
          paragraphs: JSON.stringify([
            {
              title: `얀센 백신 특징과 접종 대상`,
              content: `국내에 도입하기로 한 백신 가운데 유일하게 한 번만 접종해도 되지만, 아스트라제네카 백신처럼 희귀혈전증이 부작용으로 제시된 바 있어 30세 이상에 대해 접종이 권고되는 백신 - 30세 이상 예비군과 민방위 대원과 국방, 외교 관련 공무원, 그리고 60세 미만 군인 가족 등을 대상으로 선정.`
            }
            ,
            {
              title: `백신 접종 인센티브 내용`,
              content: `7월부터 접종 완료자는 사회적(물리적) 거리 두기상 사적모임 인원 기준(5인 또는 9인 등)에서 제외. - 식당·카페 등에서도 1차 접종자는 실외공간에 한해 인원 기준에서 빠지고 접종 완료자는 실내에서도 인원 제한을 받지 않음. - 백신을 한 번만 맞아도 공원·등산로 등 실외에서 마스크를 쓰지 않아도 됨.`
            }
            ,
            {
              title: `접종 인센티브 세부 내용`,
              content: `14일이 지난 ‘1차 접종자’와 2차 접종까지 마치고 14일이 지난 ‘예방접종 완료자’는 직계가족 모임 인원 기준(현재 8인)에서 제외됨 - 환자나 면회객 중 어느 한쪽이라도 접종을 완료한 경우 요양병원·요양시설에서 대면 면회를 할 수 있음 (다만 입소자 및 종사자의 1차 접종률이 75% 미만인 시설에서는 면회인이 코로나19 진단검사에서 음성 확인을 받아야 면회가 가능. 면회를 하려면 사전 예약을 해야 하며, 1인실이나 독립된 별도의 공간에서 함. 음식을 나눠 먹거나 음료를 섭취하는 것은 허용되지 않음. 환자는 반드시 마스크를 착용하고 손을 소독한 뒤 면회객을 만나야 함) - 백신을 1회 이상 접종한 노인은 복지관, 경로당 등 노인복지시설 이용 폭이 넓어짐. - 각종 노인시설이 다음달부터 순차적으로 운영을 재개하고, 백신 접종자는 미술, 컴퓨터 교육 등 마스크 착용이 가능한 프로그램에 자유롭게 참여할 수 있음. 접종 완료자로만 구성된 소모임을 꾸릴 수도 있으며, 이 소모임에서는 노래교실이나 관악기 프로그램을 열 수도 있고 음식도 먹을 수 있음 - 감염 취약시설 종사자의 경우 백신 접종을 완료하면 의무적으로 받는 주기적 선제검사가 면제됨. - 현재 요양병원·요양시설과 정신병원, 양로시설, 교정시설, 어린이집 등 취약시설 1만4500여곳 종사자는 주 1∼2차례 선제검사를 받고 있는데 접종 완료자는 검사를 받지 않아도 됨. - 관련 기사 링크`
            },
          ]),
        }),
        await author.createArticle({
          headline: '6월 1일부터 시행되는 부동산 관련 제도',
          category: CATEGORY.SOCIAL,
          image: 'article/107168225.2.jpg',
          imageDesc: 'this is image description',
          imageFrom: 'image source',
          briefing: JSON.stringify({
            "time": 1623994461706,
            "blocks":
              [{ "id": "HBC-KsjLLR", "type": "paragraph", "data": { "text": "내일(6월1일)부터 ‘주택 임대차 신고제’가 본격 시행된다. 이에 따라 전국 대부분의 지역에서 보증금 6000만 원 이상, 월세 30만을 넘는 임대차 계약을 한 경우에는 반드시 30일 이내에 해당지역 관할 주민센터나 정부가 운영하는 부동산거래관리시스템 등을 통해 신고" } },
              {
                "id": "ztq1wOr3ks", "type": "image",
                "data":
                {
                  "file":
                  {
                    "url": "https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/article/fded3c3db7c58c5e175460b953cffa84",
                    "name": "fded3c3db7c58c5e175460b953cffa84",
                    "size": 324
                  },
                  "caption": "",
                  "withBorder": false,
                  "stretched": false,
                  "withBackground": false
                }
              }
              ],
            "version": "2.22.0"
          }),
          status: getRandomInt(1, 4),
          paragraphs: JSON.stringify([
            {
              title: `임대차 신고제`,
              content: `임대차 계약 당사자가 임대기간, 임대료 등의 계약 내용을 신고하도록 하는 것/ - 임대차 시장의 투명한 정보공개와 임차인 보호가 목적 - 신고대상 주택 : 보증금이 6천만원을 넘거나 월세 20만원을 초과하는 임대차 주택. 1년간 유예, 내년부터 최고 100만원 과태료 발생. - 관련 Q&A 정리`
            },
            {
              title: `양도세율 증가`,
              content: `집을 팔 때 양도소득세 세율이 기존 40%에서 최고 7%%까지 오름 - 년 이상 2년 미만을 보유한 주택에는 기본세율이 60%로 오르고, 규제지역 내 다주택자에 대한 양도세율도 10% 포인트씩 오르면서 양도세 최고세율이 기존 65%에서 75%로 인상. - 더불어민주당 부동산 특별위원회가 내놓은 1세대 1주택에 대한 양도세 비과세 기분금액 상향(9억->12억) 조치는 아직은 검토 단계. 내달중 전문가 의견 수렴 등의 절차를 밟겠지만 정부에서 반대할 것으로 예상됨.`
            }
          ]),
        }),
        await author.createArticle({
          headline: `송영길의 ‘사과’에 조국은 “저를 밟고 전진하시라”`,
          category: CATEGORY.POLITICS,
          image: 'article/OJAUJXPXF5PWTLDD2TOW5S4Q5Y.jpeg',
          imageDesc: `31일 오후 서울 종로구 교보문고에 조국 전 법무부 장관의 회고록 '조국의 시간: 아픔과 진실 말하지 못한 생각'이 진열돼있다`,
          imageFrom: 'image source',
          briefing: JSON.stringify({
            "time": 1623994461706,
            "blocks":
              [{ "id": "HBC-KsjLLR", "type": "paragraph", "data": { "text": "더불어민주당 송영길 대표는 2일 취임 후 첫 기자회견에서 조국 전 법무부 장관이 자녀 입시 관련 문제 등에 대해 청년과 국민들에게 사과했다. 그러나 한편으로는 “조국 전 장관에 대한 검찰 수사의 기준은 윤석렬 전 검찰총장의 가족비리와 감찰가족의 비리에 대해서도 동일하" } },
              {
                "id": "ztq1wOr3ks", "type": "image",
                "data":
                {
                  "file":
                  {
                    "url": "https://swlabs-saver.s3.ap-northeast-2.amazonaws.com/article/fded3c3db7c58c5e175460b953cffa84",
                    "name": "fded3c3db7c58c5e175460b953cffa84",
                    "size": 324
                  },
                  "caption": "",
                  "withBorder": false,
                  "stretched": false,
                  "withBackground": false
                }
              }
              ],
            "version": "2.22.0"
          }),
          status: getRandomInt(1, 4),
          paragraphs: JSON.stringify([
            {
              title: `말과 입장들`,
              content: `- 조국 전 장관 : “겸허히 받아들인다” “민주당은 이제 저를 잊고 부동산, 민생, 검찰, 언론개혁 등 개혁작업에 전진해 주시길 바라 마지 않는다” “저를 밟고 전진하시라” - 이재명 경기도지사 : “당대표께서 입장을 내셨으니 저는 당원으로서 당대표 현지도부의 입장을 존중하는 게 바람직하다고 생각합니다” - 이낙연 전 더불어민주당 대표 : “야당의 유력 대권후보로 거론되면서 세상 앞에 아직 자신을 드러내지 않는 윤석열 전 검찰총장은 스스로에게 제기된 문제들 앞에 지금 ‘공정’한지를 질문하려 한다” - 김한정 더불어민주당 의원 : "무슨 대역죄인도 아니고 조국 전 법무부 장관을 좀 놓아주자" "정작 (조국 전 장관) 본인은 '자기를 밟고 앞으로 가라'고 말하지만, 당까지 나서서 부관참시도 아니고 밟고 또 밟아야 하겠나" "그러면 지지도가 올라가는가" - 정봉주 전 의원 : “민주당이 오판하고 있다…조국 문제를 정면으로 싸우지 않고는 대통령 선거는 물건너 간다”`
            },
          ]),
        })
      }),
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles');
  },
};
