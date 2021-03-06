'use strict';
const { Author } = require('../models');
const CATEGORY = require('../lib/constants/category');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const authors = await Author.findAll({});
		await Promise.all(
			authors.map(async (author, idx) => {
				await author.createArticle({
					headline: '서울 인사동에서 570년 전 금속활자 1,600점이 발견되다.',
					category: CATEGORY.CULTURE,
					image: 'article/1625192453352.jpg',
					imageDesc: '29일 오전 서울 종로구 국립고궁박물관 본관 강당에서 열린 서울 공평동 유적 출토 중요유물 언론공개회에서 조선 전기 금속활자 등이 공개되고 있다. ',
					imageFrom: '뉴스1',
					briefing: escape("서울 인사동 땅 속에서 조선 전기 때로 추정되는 1600여점 (한자 1,000점/ 한글 600점)의 금속활자가 쏟아져 나왔다. 지금까지 인쇄본으로만 전해지던 초창기 훈민정음 음운이 활자 실물로 나타난 것이다. 이는 그간 베일에 싸여있던 조선 전기 활자/인쇄 연구를 급진전시킬 역대급 유물로 평가 된다."),
					status: 4,
					publishedAt: Date.now(),
					paragraphs: escape(`<p><strong>1. 왜 중요한가.</strong></p><ul>
<li>지금까지 전해진 활자 가운데 가장 이른 시기의 한글 금속활자가 다수 나왔다. 훈민정음 창제 당시 동국정운식 한자표기도 포함하고 있으며, 활자 크기가 대자(大字), 중자(中字), 소자, 특소자까지 다양.</li>
<li>한문 금속활자 중 일부는 세종 때 만들어진 금속활자 중 가장 완전한 형태로 칭송받는 ‘갑인자(甲寅字)’로 추정. 1434년 만들어진 ‘초주갑인자’일 경우, 가장 이른 시기의 조선 금속활자로 쿠텐베르크(1440년) 이전 금속활자 인쇄본을 가진 우리나라가 확실한 실물 활자까지 갖게 되는 것.</li>
</ul><p><strong>2. 조선 전기 금속활자가 그렇게 희귀한가.</strong></p><ul>
<li>현재 중박 및 규장각 등에 보관된 수십만자의 금속활자는 대부분 17‧18세기 이후 주조된 것들</li>
<li>조선 전기(임진왜란 이전) 금속활자는 중박 소장 을해자 한글활자 뿐이었다. 그런데 이번엔 을해자 한자도 나오고 한글도 훨씬 많이 나왔으며 을유자(1465년) 한자활자도 나옴.</li>
</ul><p><strong>3. 다른 유물은</strong></p><ul>
<li>물시계 부속품으로 추정되는 동제품, 천문시계 부품, 조선시대 화포인 총통(銃筒), 동종(銅鐘) 등 모두 금속 유물</li>
<li>기록으로만 전해온 조선시대 자동 물시계의 주전과 천문시계 실체가 처음 확인되어, 기록으로만 전해져오던 세종 시기 과학기술의 실체를 엿볼 수 있게 됨</li>
</ul><p><strong>4. 왜 이곳에서 발견되었나</strong></p><p>

</p><ul>
<li>금속활자나 다른 유물들이 궁궐, 왕실이 아닌 시전과 중인들인 거주하던 건물에서 출토</li>
<li>모든 유물을 일부러 조각내고 잘라 넣어 사실상 ‘재화 재활용’으로 남긴 것으로 추청</li>
</ul>`),
				});
				await author.createArticle({
					headline: '대법원 정경심, 사모펀드 운영 관련 무죄 ',
					category: CATEGORY.POLITICS,
					image: 'article/1625450746058.jfif',
					imageDesc: '정경심 교수가 사모펀드 혐의 공범이라는 검찰의 주장은 인정되지 않아 이 범죄와 조 전 장관 일가는 사실상 무관한 것으로 결론났다 더 팩트',
					imageFrom:
						'더 팩트',
					briefing: escape("6월 30일 대법원 3부는 정경심, 조국 전 법무부 장관 부인의 사모펀드 운영 관련해서 조범동과 검사의 항소를 기각하고, 정경심 교수의 무죄를 판결한 원심을 확정했다고 밝혔습니다."),
					status: 4,
					publishedAt: Date.now(),
					paragraphs: escape(`
					<p><strong>판결내용</strong></p>
<ul>
<li>조국 전 법무부 장관의 5촌
조카이자 사모펀드 운용사 코링크PE 대표인 조범동(38)씨가
징역 4년과 벌금 5000만원을 대법원에서 확정. 조씨가 사모펀드를 운영하면서 저지른 자본시장법 위반 혐의나 횡령·배임 혐의를 대부분 유죄로 인정.</li>
<li>대법원이 정교수와 조씨 간의 공모가 없다는 점을 분명히 하여, 정 교수가 코링크PE의 실소유주이고, ‘권력형 비리’라는 주장의 논리가 무너짐.</li>
</ul>
<p><strong>정경심교수 진행중인재판과 대법원 판결의 영향</strong></p>
<ul>
<li>정교수는 현재 입시비리/ 사모펀드/ 증거인멸 등 세가지 혐의로 재판을 받고 있음</li>
<li>이번 대법원 판결로 사모펀드 관련해서 증거인멸교사 혐의에 대해선 다툴 여지가
남아있지만, 공모관계가 인정되지 않은 '컨설팅비 횡령’과
‘금융위원회 거짓 보고’ 혐의에 대해선 무죄가 나올 가능성이 커짐.</li>
</ul>
<p><strong>판결에 대한반응</strong></p>
<ul>
<li>대법원의 판결을 통해 그 동안 검찰이 사모펀드를 가지고 조카와 공모했다고 기소한 것이 검찰의 무리한 기소였다는 것을 증명</li>
</ul>
<p><img src="https://d3vnt6byjajzpu.cloudfront.net/article/1625450740199.jpg" alt="https://d3vnt6byjajzpu.cloudfront.net/article/1625450740199.jpg"></p>"
					`),
				}),
				await author.createArticle({
					headline: '윤석렬 장모, 징역 3년 법정 구속...요양급여 부정수급 혐의',
					category: CATEGORY.POLITICS,
					image: 'article/1625461951624.jpg',
					imageDesc: '요양병원을 개설하고 요양급여를 편취한 혐의를 받고 있는 윤석렬 전 검찰총장의 장모 최씨가 2일 경기도 의정부지방법원에서 열린 1심 선고공판에 출석하고 있다.',
					imageFrom: '연합',
					briefing: escape(`<p>흔들리는 '자유와 법치'</p>
<ul>
<li>의정부지법 합의 13부는 2일 의료법 위반과 특정경제 특정경제범죄 가중처벌 등에 관한 법률상 사기 혐의로 기소된 윤석렬 전 검찰총장의 장모 최씨에게 징역 3년을 선고하고 법정 구속했다.</li>
</ul>`),
					status: 4,
					paragraphs: escape(`<p>왜?</p>
<ul>
<li>최씨가 의료인이 아닌데도 동업자 3명과 의료재단을 설립한 뒤 2013년 2월 경기 파주시에 요양병원을 개설 운영하는데 관여하면서 2015년 5월까지 국민건강보험공단으로부터 요양급여 22억 9000만원을 편취했다는 것임.</li>
</ul>
<p>사건의 시작은?</p>
<ul>
<li>지난해 4월 7일 최강욱 열린민주당 대표 등이 장모 최씨와 부인 김건희 씨, 윤총장 등를 각종 비리 혐의로 고발하면서 재수사 시작</li>
</ul>
<p>무엇이 문제인가?</p>
<ul>
<li>과거 첫번째 검찰수사에서 동업자 3명은 기소되고 유죄판결이 내려졌음에도 최씨만 무혐의 처분이 내려진 사유를 철저히 조사해야 한다는 것임</li>
</ul>
<p>윤석렬의 입장</p>
<ul>
<li>“저는 그간 누누이 강조해 왔듯이 법 적용에는 누구나 예외가 없다는 것이 제 소신”</li>
</ul>`),
					publishedAt: Date.now(),
					updatedAt: Date.now(),
				}),
				await author.createArticle({
					headline: `대선 후보 1,2위 이재명과 윤석렬, 대권 도전 공식 선언`,
					category: CATEGORY.POLITICS,
					image: 'article/1625463196427.jpg',
					imageDesc: ``,
					imageFrom: '연합',
					briefing: "윤석렬에 이어 이재명도 어제 7월 1일 대권 도전을 선언했다. 이런 가운데 SBS가 조사한 여론조사에서는 이재명(28.7%)과 윤석렬(26.1%)이 오차범위내 접전인 것으로 나타났다. 유력 대선 주자인 두 사람에 대한 간단 정리",
					status: 4,
					paragraphs: escape(`<ol>
<li>이재명 : 핵심 키워드 ‘공정경제’ ‘기본소득’</li>
</ol>
<ul>
<li>흑수저 출신 인권변호사 : 가난 때문에 중학교에 진학하지
못한 소년공 출신. 중고등학교를 검정고시로 마치고 중앙대 법과대학 입학. 1986년 사법고시 합격후, 당시 노무현 변호사의 강연에 감명받아
인권변호사의 길로 나섬.</li>
<li>2010년 보수 성향이었던 성남에서 3수 끝에 시장 당선 : 자자체 최초로 모라토리엄(성남시의 비공식 부채 상환이 어렵다며 사업 투자순위 조정과 예산 삭감 등 초긴축재정 작업을 벌임)선언하며 정치 시작. 청년배당(기본소득), 공공
산후조리원, 무상교복 등 선도적인 복지정책을 주도하며 스타시장으로 떠오름.</li>
<li>‘새로은 경기, 공정한 세상’으로 도정 슬로건을 내걸고 2018년 경기도 지사에 당선 : 코로나19에 따른 팬데믹 상황에서 ‘해결사’이미지로 호평. 기본소득에
이어 기본주택까지 ‘보편복지’를 주장. 포퓰리즘이라는 일부의 비판에도 불구 이재명식 복지제도와 공정에 대한 인식을 확고히 대중에게 각인.</li>
<li>장점은 정치적 선명성과 과감한 추진력. 과거 형수 막말
등 가족사와 사생활 관련 도덕성은 약점</li>
</ul>
<ol start="2">
<li>윤석렬 : 핵심 키워드 ‘자유와 법치’</li>
</ol>
<ul>
<li>26년간 검사로 재직(주로 특수부) 중 2013년 박근혜 정부 시절 국정원 대선개입 사건을 맡고 있다가
윗선의 수사방해가 있었다고 폭로하면서 대중에게 이름을 알림 “저는 사람에게 중성하지 않는다”란 말로 유명해지고 당시 야권(민주당)의 큰 호응 받음. 이후 박근혜 ‘국정농단’사건시 특검 일원으로 활약</li>
<li>문재인 정부 이후 서울중앙지검장으로 화려하게 복귀, 검찰총장으로
임명.. 이후 검찰개혁의 임무를 띄고 법무부장관으로 내정된 조국 전 장광의 가족비리 의혹과 원전 등
청와대 관련 사건 등을 수사하면서 현재 여권과 멀어지고 야권의 기대주가 됨.</li>
<li>박근혜 문재인 정부와 충돌하면서 ‘권력에 맞선 원칙주의자’라는 이미지를 얻었지만 경험부족과 검찰의 정치적 중립성 훼손 논란. 그리고
가족 비리 논란 등 본격적인 검증의 시간이 시작됨.</li>
<li>홍준표의 말 : “검찰이 보통 가족 수사를 할 때는 가족 중 대표자만
수사를 한다. 윤 전 총장은 과잉수사를 했다. 집요하게 조국
동생을 구속하고, 5촌 조카 구속에, 딸 문제도 건드렸다. 심하게 했지. 목표가 조국 퇴진이니까. 이후 이게 정치사건이 돼버렸다. 요즘에 와서 윤 전 총장이 고발도
스물몇건 당하고, 자기 처, 장모 다 걸렸다. 자업자득이다. 자기가 적폐수사 하고, 조국 수사할 때 강력하게 수사했던 것을 지금 본인 가족 수사에 대해서는 ‘나는 아니다’ 이런 식으로 하면 안
되지. 자기도 극복하고 나가야지.”&nbsp;<a href="https://www.hani.co.kr/arti/politics/assembly/1001864.html">한겨레 인터뷰기사 원문 보기</a></li>
</ul>`),
					publishedAt: Date.now(),
					updatedAt: Date.now(),
				}),
				await author.createArticle({
					headline: `[KBS김원장 기자의 특파원 리포트] 선진국은 한국에 비해 코로나에 돈을 얼마나 썼을까`,
					category: CATEGORY.CULTURE,
					image: 'article/1625463344595.jpg',
					imageDesc: `김원장 기자가 선진국과 한국의 코로나 관련 재정 리포트를 작성했다 `,
					imageFrom: 'kbs',
					briefing: escape("정부의 추경 발표 이후 코로나 상황에서의 정부 지원 방식에 대한 논란과 함께 일부 언론에서 제기되고 있는 ‘빚투성이 정부’에 대한 문제제기에 대한 궁금증을 KBS 김원장 기자의 특파원리포트를 통해 알아본다. 김기자는 “지금 이 상황은 정부가 빚을 내서 돈을 더 쓸 상황이라고 말한다"),
					status: 4,
					paragraphs: escape(`<p><strong>왜 그런가</strong></p>
<ul>
<li>국가가 돈을 쓰지 않으면 국민의 부채가 늘어난다.</li>
<li>실제 지난 한 해 동안 우리 가계부채는 8.6%p(171조원)나 늘었다. 덕분에 가계부채는 이제 2,000조 원에 육박한다. 너무 힘든데 정부가 지원을 해주지 않자, 힘들어진 국민들은 결국 빚을 늘렸다</li>
<li>같은 기간 미국 국민들의 가계부채는 4.9%, 일본은 3.9%, 영국은 6.2%, 이탈리아 3.7%, 스페인은 5.6% 늘었다. 유로존의 평균 가계부채는 4.9% 늘었다(자료 BIS 국제결제은행).</li>
<li>우리보다 훨씬 코로나가 심하게 창궐해 1년 가까이 가게 문을 닫은 나라의 국민들이 우리보다 빚은 덜 늘어났다.</li>
<li>그러니 우리 정부가 재정을 아껴서 재정 적자를 줄인 것이 과연 박수 받을 일인가? 어머니가 돈을 아껴 아들 빚이 훌쩍 늘어났는데, 그게 진짜 잘 한 것인가?</li>
</ul>
<p><strong>그런데 한국 언론들은?</strong></p>
<ul>
<li>우리 언론에선 ‘선진국은 재정정상화, 한국은 중단없는 나라빚 폭주’같은 기사가 이어진다. ‘영국같은 나라도 확대재정을 축소하고 있는데, 우리 정부는 더 쓸 궁리만 하고 있다’고 비판한다.</li>
<li>영국은 지난해 재정 적자가 무려 GDP의 13.3%나 됐다. 이런 나라가 올해 코로나가 잡히면 재정적자 축소를 검토하는 것은 당연한 것 아닌가.****</li>
</ul>
<p><strong>외국에서 우리를 바라보는 시각</strong></p>
<ul>
<li>미국 재무부가 한국 정부는 돈을 더 써야 한다고 지적한다. 지난 4월 미 재무부는 '거시경제·환율보고서'에서 ‘한국의 코로나19 재정 지출 규모가 다른 선진국들에 비해 너무 작으며, (한국의 역사에서는 큰 규모지만) 재정을 더 투입해 경제적 지원을 해야한다’고 지적했다.</li>
<li>재정을 확대해 구체적으로 ‘청년들에게 경제적 기회를 넓히고’, ‘노년층의 빈곤을 예방’할 것으로 조언했다.</li>
<li>그런데 이 무렵 우리 언론에선 ‘재정적자 증가폭 역대 최대, 숨막히는 부채공화국’같은 기사가 쏟아졌다.</li>
</ul>
<p><strong>우리와 다른 미국 언론의 지적</strong></p>
<ul>
<li>이 문제를 역시 한국언론이 외면하자, 이번엔 바다건너 월스트리저널(WSJ)이 이 문제를 지적했다(6월 8일). 이 신문은 이런 큰 위기가 찾아오면 어떤 부문이던 결국 돈을 더 빌릴 수밖에 없다고 지적했다.</li>
</ul>
<p>이를 막기 위해 정부가 돈을 더 지출해야 하고, 어떤 나라는 할 수 있는데도 하지 않았다(In some cases, governments could have taken on more debt, but chose not to)며, 그 예로 ‘한국’을 지목했다.</p>
<ul>
<li>그냥 콕 찝어 ‘한국’이라고 못을 박았다(South Korea is perhaps the most obvious case of an economy that had more room to provide fiscal support). 월스트리트는 결국 같은 기간 한국의 비금융기업과 가계의 부채가 GDP 대비 각각 9.2%p, 8.6%p 상승했다고 꼬집었다. 이런 민간 부분의 부채 증가가 공적부분의 부채증가보다 더 경제 성장에 해롭다는 지적도 덧붙였다</li>
<li>참고로 월스트리트저널이 코로나 시기에 정부보다 민간의 부채가 더 증가했다고 꼽은 나라들은 한국을 비롯해 ‘중국’ ‘태국’ ‘러시아’ 등이다. 참으로 공교롭게 이들 나라들 모두 ‘언론’이 국민들에게 신뢰를 받지 못하는 나라들이다.</li>
</ul>
<p><strong>그럼 우리는 무엇을 해야 할 때인가</strong></p>
<ul>
<li>사람에게도 때가 있듯이 국가에게도 때가 있다. 지금은 ‘돌봄’이 필요한 시기이다.</li>
<li>세계 12번째의 경제력을 가진 국가는 바이러스로 ‘지치고’ ‘쓰러지고’ ‘포기하는’ 국민들을 돌볼 의무가 있다.</li>
<li>국가의 재정은 무엇을 위해 쓰여야 하는가? 우리는 왜 재정을 아끼는가?</li>
<li>청소하다가 컨베이어벨트에 낀 그 노인을 뒤로하고 ‘재정건전성’이 번듯한 나라가 우리가 진짜 만들고 싶은 나라인가. 우리는 계속 스스로에게 물어야한다. 국가의 재정은 왜 존재하는가.</li>
</ul>
<p><a href="https://news.kbs.co.kr/news/view.do?ncd=5216051&amp;ref=A">관련기사 전문 보기</a></p>`),
					publishedAt: Date.now(),
					updatedAt: Date.now(),
				})
				await author.createArticle({
					headline: `최재형, 다음주 사의 표명, 대권 도전 밝힐 듯`,
					category: CATEGORY.POLITICS,
					image: 'article/1625472128750.jpg',
					imageDesc: `최재형 전 감사원장이 국회에 나와 설명하고 있다.`,
					imageFrom: '연합뉴스',
					briefing: escape("최재형 감사원장이 중립성 독립성 논란에도 불구하고 다음주 감사원장직 사퇴 의사를 밝히고 대선 출마를 공식 선언할 것으로 보인다."),
					status: 4,
					paragraphs: escape(`<p><strong>최재형간단 이력</strong></p>
<p>-&nbsp; 경남 진해 출신. 경기고, 서울대
법학과를 거쳐 1981년 사법시험에 합격</p>
<ul>
<li>
<p>서울지법 동부지원 판사, 서울민사지법 판사, 청주지법 충주지원 판사, 서울지법 서부지원 판사, 서울고법 판사, 서울지법 판사, 춘천지법
원주지원장, 서울지법 부장판사, 대구고법 부장판사, 서울고법 부장판사, 대전지법 법원장, 서울가정법원 법원장 등 판사 외길 인생.</p>
</li>
<li>
<p>지난 2017년엔 사법연수원장을 맡은 지 채 1년도 되지 않아 문 정부의 첫 감사원장 후보자에 지명.</p>
</li>
</ul>
<p><strong>왜 야권 후보 최재형인가?</strong></p>
<ul>
<li>
<p>‘월성 1호기
경제적 평가에 대한 감사’ 등 정부의 정책 기조에 반하는 감사활동</p>
</li>
<li>
<p>정부
여당에 대한 비판적 발연들 : “대선에서 41% 지지 밖에 얻지 못한 정부의 국정과제가 국민 합의를 얻었다고 할 수 있겠느냐” “(대통령의) 공약사항을 어떤 방법을 통해서든 수단과 방법 가리지 않고
모두 정당화된다 이런 주장은 아니지 않나” 등의 발언으로 야권의 기대감 높힘.</p>
</li>
</ul>
<p><strong>무엇이 문제인가</strong></p>
<ul>
<li>감사원의
정치 중립성 훼손이라는 우려 속에 감사원 내부에서도 정치참여는 부적절 하다는 비판의 목소리가 많음</li>
<li><strong>윤건영 더불어민주당 의원</strong> : “정치적 중립성이 누구보다 중요한
감사원장이 임기 중에 임기를 박차고 나와 대선에 출마한다는 것은 국민에 대한 모독”이라며 “절대 안 된다”고 지적.</li>
<li><strong>이철희 정무수석</strong> : “임기를 채우지 않는 이유가 정치적 행위를
위해서, 예컨데 출마를 위해서라면 책임 소재를 떠나 조직에는 마이너스 효과이지 않을까”</li>
</ul>`),
					publishedAt: Date.now(),
					updatedAt: Date.now(),
				})
				await author.createArticle({
					headline: `코로나 4차 유행 오나? 기본 방역수칙만 지키면 문제 없다`,
					category: CATEGORY.SOCIAL,
					image: 'article/1625540604518.jpg'	,
					imageDesc: `정부가 코로나19 4차 유행에 대비, 하루 2000명의 환자 발생에도 대응 가능한 방역ㆍ의료역량 구축하겠다고 선언했다`,
					imageFrom: ' KTV',
					briefing: escape("코로나19 신규 확진자가 7월 6일 기준으로 746명이다. 6개월 만에 가장 많은 확진자수가 나온 상황이라 4차 유행을 우려하는 목소리가 나오고 있다."),
					status: 4,
					paragraphs: escape(`<p><strong>1. 현 상황</strong></p>
<ul>
<li>전국민의 30% 정도가 1차 접종을 마친 상태라 기존에 비해서는 바이러스 전파속독가 느려진 상태. 집단감염은 거의 발생하지 않아서 재유행 가능성은 상대적으로 낮음.</li>
<li>활동이 많고 아직 백신접종을 하지 않은 20대 감염률이 2배로 증가. 휴가 방학으로 대유행이 우려되나, 휴가를 즐기더라고 기본적인 방역수칙을 철저하게 지키면 대규모 확산을 막을 수 있음.</li>
</ul>
<p><strong>2. 델타 변이 확산</strong></p>
<ul>
<li>6월 기준으로 전체 감염자 중 4.5%가 델타변이로 조사되었으며, 해외유입 뿐만 아니라 국내 지역 사회 감염으로 확산되고 있어 가을 이후 우세종 지위를 델타변이가 차지할 것으로 예측</li>
</ul>
<p><strong>3. 새로운 거리 두기 실행해도 무방</strong></p>
<ul>
<li>새로운 거리두기 체계에 따르면 현재 수도권의 확진자 수는 3단계 기준을 충족하고 새로운 거리두기의 3단계는 현재 2단계와 거의 유사</li>
<li>백신의 접종률이 올라간다고 변이 바이러스의 영향을 고려하면 확진자 수가 꼭 줄어든다는 보장도 없다는 점.</li>
<li>백신 접종으로 치명률의 거의 4분의 1 정도는 0.5% 수준으로 떨어져 있는 상황으로 독감에 근접.</li>
</ul>`),
					publishedAt: Date.now(),
					updatedAt: Date.now(),
				})
				await author.createArticle({
					headline: `하반기 부터 달라지는 경제정책과 제도 간단 정리`,
					category: CATEGORY.CULTURE,
					image: 'article/1625548929765.jpg',
					imageDesc: ``,
					imageFrom: '기획재정부',
					briefing: escape("법정 최고 금리가 20% 내려가고 5인 이상 기업에게도 주 52시간 근무제가 도입되는 등 세금이나 생활, 교통 분야 등 하반기부터 달라지는 각종 경제 정책과 제도에 대해 정리한다."),
					status: 4,
					paragraphs: escape(`<p><strong>1. 법정 최고 금리 연 24%에서 20%로 인하</strong></p>
<ul>
<li>저축은행이나 카드사에서 대출받은 고객에게도 금리인하 적용</li>
</ul>
<p><strong>2. 52시간 근무제 확대</strong></p>
<ul>
<li>기존 50인 이상에서 5인 이상 기업에게도 적용.</li>
</ul>
<p><strong>3. 특수형태 근로종사자도 고용보험 가입 가능.</strong></p>
<ul>
<li>보험설계사, 택배기사, 학습지 강사 등 12개 직종이 고용보험에 가입할 수 있게되어 실업급여와 출산전후급여를 받을 수 있게 됨.</li>
</ul>
<p><strong>4. 1주택자에 대한 세금 변화.</strong></p>
<ul>
<li>서민·실수요자 세 부담 완화를 위해 공시가격 6억 원 이하 1주택자에 대한 재산세 세율은 기존 0.1~0.4%에서 0.05~0.35%로 낮아짐.</li>
<li>공시가격 6억 원 주택을 보유한 경우 최대 18만 원까지 세금을 줄일 수 있음.</li>
</ul>
<p>**5.</p>
<p>무주택자에 대한 주택담보대출 혜택이 확대.**</p>
<ul>
<li>만 39세 이하 청년, 혼인 7년 이내 신혼부부는 만기 40년 정책모기지도 이용할 수 있게 됨. 현재는 30년 만기, 금리 2.85%로 3억원을 대출받으면 월 상환금액이 124만원인데 40년 만기를 이용할 땐 월 105만7천원으로 14.8% 감소.</li>
</ul>
<p><strong>5. 3% 초과한 카드 사용액의 10% 캐시백</strong></p>
<ul>
<li>구체적으로는 2분기 월 평균 카드사용액 대비 3% 이상 증가한 카드 사용액의 10%를 다음달에 캐시백으로 주는 방식. 일례로 2분기에 월 평균 카드 사용액이 100만원인 사람이 8월에 153만원을 사용했다면 3%를 초과한 50만원의 10%인 5만원을 캐시백해주는 방식. 단 매월 10만원,1인당 총 30만원의 한도를 둠.</li>
</ul>
<p>**6.</p>
<p>생활과 교통 분야**</p>
<ul>
<li>12월부터 단독주택에서도 투명페트병 별도 분리배출이 의무화. 투명페트병 별도 분리배출제는 지난해 12월 아파트 등 공동주택에서 우선 시행했는데 올해 12월 15일 부터는 단독주택까지 포함해 전국에 확대 시행.</li>
<li>과징금은 분할 납부와 연기 가능(개별법에 연기나 분납을 막는 조항이 없다면)</li>
<li>다음 달부터는 고의적으로 양육비를 주지 않는 사람에 대한 처벌은 강화. 양육비를 고의적으로 이행하지 않는 부모에게는 신상 공개나 출국금지 조치가 내려지고, 1년 안에 양육비를 지급하지 않으면 최대 1년 징역 또는 1천만 원 이하의 벌금에 처해짐.</li>
<li>10월 21일부터는 어린이 보호구역 내에서는 원칙적으로 모든 차량의 주정차가 금지.</li>
</ul>
<p><a href="http://vip.mk.co.kr/news/view/21/31/173124.html">관련기사 보기 : MK증권</a></p>
<p><a href="https://www.kado.net/news/articleView.html?idxno=1080342">관련기사 보기 : 강원도민일보</a></p>`),
					publishedAt: Date.now(),
					updatedAt: Date.now(),
				})
			}),
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Articles');
	},
};
