# 고재성 (Ko, Jae Sung)

**Full Stack Developer · Forward Deployed Engineer @ KAKAO**
`#AI` `#데이터엔지니어링` `#대용량트래픽` `#콘텐츠플랫폼` `#빌링`

- 📍 경기도 용인시 기흥구
- ✉️ kojaesung@gmail.com

---

## 한 줄 소개

18년차 풀스택 개발자. 현재 카카오 FDE(Forward Deployed Engineer)로 사내 서비스의 AX(AI Transformation)·DX(Digital Transformation)를 담당하며, 현업 조직에 들어가 AI 기능(상품 댓글 요약, 타겟팅 메시지·이미지 자동 생성)을 직접 설계·구축·배포하고 있습니다. 직전에는 커머스 데이터 엔지니어로 검색·추천 인프라 이관과 실시간 ETL을 구축했고, 2020년부터 5년간 콘텐츠 유통 플랫폼 개발 리더로 전사 콘텐츠 수집·분류·서빙 시스템을 이끌었습니다. Daum 첫 화면 같은 대용량 트래픽 서비스부터 빌링, ML/LLM 분류, 배포 자동화까지 서비스 전 영역을 만들어 왔습니다. 업무 밖에서는 테니스 동호인을 위한 빈 코트 조회·대진표·입문 정보 서비스를 직접 만들어 운영하고 있습니다.

---

## 핵심 이력 (Highlights)

| 구분 | 내용 |
|---|---|
| **AX/DX (FDE)** | 사내 서비스 AI 전환 담당. 메이커스 상품 댓글 AI 요약, 타겟팅 메시지·이미지 AI 자동 생성 |
| **Side Projects (운영 중)** | 빈 코트 조회 ytcc.info, 테니스온라인, 대진표 생성 유틸리티, 올림픽공원 메인코트 예매 뷰 |
| **데이터 엔지니어링** | 프로모션빌더 검색 인프라 이관, Multi-Embedding ANN 전환 검증, 연관추천 피처스토어 확장, 실시간 ETL 신규 구축 |
| **리더십** | 2020.07 ~ 2025.08 콘텐츠 유통 플랫폼 개발 리더 5년 역임 |
| **ML/LLM 분류** | Tf-Idf · Word2Vec · ES Percolator · LLM 기반 실시간 콘텐츠 분류 및 저품질 필터링 |
| **대용량 트래픽** | Daum PC/모바일 첫 화면(daum.net, m.daum.net) 백엔드·프론트·CMS 전면 개편 |
| **인프라/DevOps** | Jenkins + Ansible + AWX 기반 대규모 배포·롤백 자동화 |
| **발표** | if(kakao) 2018 「다음 모바일 첫 화면 개선기」 |

---

## Side Projects (운영 중)

테니스 동호인으로서 직접 겪은 불편을 서비스로 풀고, AI를 일상 자동화에 활용하고 있습니다.

- **[ytcc.info](https://ytcc.info)** — 용인시·광주시 테니스장 빈 코트 통합 조회. 매번 각 시설에 로그인해 개별로 빈 코트를 찾아야 했던 동호인의 불편을 한 화면으로 해결
- **[테니스온라인](https://tennisonline.co.kr/)** — 테니스 입문자를 위한 정보 사이트 운영
- **[KDK 대진표](https://kdk.ytcc.info/)** — 이름만 적으면 파트너를 바꿔가며 도는 복식 대진표 생성
- **[COURT 360](https://court-view.vercel.app/)** — 올림픽공원 테니스 센터코트 예매 시 좌석별 관람 뷰 제공
- **개인 AI 자동화 (Discord)** — 날씨·운세·뉴스 등 일상 정보를 LLM으로 요약·생성해 Discord 알림으로 매일 자동 브리핑
- **경기 재난 화폐 맵** (2020.04) — 재난기본소득 사용 가능 매장 지도. 조직 내 발표로 실사용 사례 공유 ([발표 자료](https://docs.google.com/presentation/d/1VVlKq18UnHh_7kyVk7gBA6ABr7yBOzL46h_Jp4sJZkE/edit?usp=sharing))

---

## 경력

### KAKAO — Full Stack Developer
**2014.05 ~ 현재 · 경기도 성남**

#### Forward Deployed Engineer (2026.06 ~ 현재)
사내 서비스의 AX/DX 담당. 현업 조직과 밀착해 LLM 기반 기능을 직접 설계·구축·배포하며 실제 서비스에 AI를 적용
- **메이커스 상품 댓글 AI 요약**: 상품별 구매 후기 자동 요약
- **메이커스 상품 타겟팅 메시지**: 고객 세그먼트별 메시지 AI 생성
- **상품 이미지 AI 자동 생성**: 프로모션·타겟팅용 이미지 자동 생성

#### 커머스 데이터 엔지니어 (2025.08 ~ 2026.05)
**프로모션빌더 검색 인프라 이관 (Yoshi)**
- 프로모션빌더 이관, epsilon 인덱스 전환, cdp-air 클라이언트 전환
- API 품질 개선: 잘못된 500 응답을 400으로 정정, 페이징·카테고리 정보 보강, 선물하기 메타 이관
- 이관 후 Sentry·AEM 알람 노이즈 정리로 안정화까지 완수

**Multi-Embedding(MULTI_ANN) 전환 검증**
- 기능 동등성 검증, Filtered ANN 성능 벤치마크, 사용팀 마이그레이션 가이드 작성으로 전환 리스크 사전 제거

**연관추천 피처스토어 확장**
- gift/talkstore 인덱스 필드 확장(B2B 여부, 대표 전시 카테고리, 주문수 정규화)
- 조인 배치 개선, force_merge로 인한 ES 부하 개선

**실시간 ETL 신규 구축**
- 클레임 DB·배송 정시도착(delivery_on_times) 실시간 수집 및 하둡 적재, 도착예측정보 ETL
- 커머스추천팀에 태그 피드백·임베딩 데이터 제공

#### 포털 콘텐츠 유통 플랫폼 개발 리더 (2020.07 ~ 2025.08)
- 전사 콘텐츠를 통합 수집·주제별 분류·서비스·Tracking 하는 플랫폼 개발 및 운영툴 구축
- ML(Tf-Idf, Word2Vec) + ElasticSearch Percolator + LLM 필터로 **실시간 콘텐츠 분류 시스템** 구축
- LLM 기반 저품질 콘텐츠 자동 분류·제거로 기존 RDB 필터 대비 성능 향상
- RDB 필터 → ES Percolator 전환으로 필터 증가에 따른 성능 저하 해결
- MSA/Kafka 파이프라인의 데이터 흐름 추적 문제를 ELK 스택 모니터링으로 해결, 디버깅·CS 대응 효율 개선
- MongoDB 기반 콘텐츠 변경 이력 관리 및 로그 자동화로 데이터 정합성 확보

#### 대규모 서버 배포 및 모니터링 시스템 (Side Project)
- Shell 수작업 배포로 잦았던 장애를 Jenkins + Ansible + AWX 기반 CI/CD로 자동화
- 배포 히스토리 추적 및 롤백 자동화 도입으로 장애 발생률 감소

#### Daum 모바일/PC 첫 화면 개발 (m.daum.net, daum.net)
- 백엔드·프론트엔드·CMS 운영툴 개편 프로젝트 전체 참여
- 요청 속도 저하로 인한 이탈 문제를 콘텐츠 캐싱·비동기 처리·Lazy Loading으로 해결
- if(kakao) 2018 발표 「다음 모바일 첫 화면 개선기」

### Daum Communications — Web Developer
**2011.01 ~ 2014.05 · 제주**

- **서버 장애 관리 시스템 (PL)**: 장애 티켓 발행·담당자 처리 트래킹, 장애 보고·통계, 코멘트 공유 시스템 개발. 운영팀 협업으로 장애 대응 시간 약 30% 단축
- **서버 모니터링 시스템**: 수만 대 서버 metric 그래프 웹 시스템 리뉴얼

### HumusOn — Web Developer
**2010.03 ~ 2010.12 · 서울 강남**

- **E-Mail/SMS 대량발송 시스템 (PL)**: postman.co.kr 개발, 매출 통계 기능
- **E-Mail Tracking 시스템**: 도달률·오픈률 분석 기반 타겟 마케팅 구현, 고객 반응률 20% 이상 증가
- LGU+ 기업용 E-Mail 청구서 시스템 구축 참여

### TmaxData — Database Engineer
**2009.08 ~ 2010.01 · 경기도 성남**

- Tibero DB Data Migration, Query Performance Tuning, Consulting
- 교보생명(AML 프로젝트 DB 성능 약 30% 향상), 한국언론재단, 한진정보통신, 한국교육정보연구원 기술 지원

### TmaxSoft — Software Developer
**2008.03 ~ 2009.07 · 경기도 성남**

- KT 번호이동 데이터 연계 시스템 개발
- 롯데JTB 여행사 업무 시스템: 항공 예약·발권, 항공권 요금 정산(Billing) 개발
- 인천 해양경찰청 함정 계획 정비시스템(PMS) 개발·유지보수
- 신한생명 차세대 프로젝트 Pro-Frame 기술 지원

---

## 기술 스택

| 영역 | 기술 |
|---|---|
| **AI/ML** | LLM 기반 요약·생성·분류, Multi-Embedding ANN, Tf-Idf, Word2Vec, ES Percolator |
| **Data** | Kafka, Hadoop, ElasticSearch, Kibana, 실시간 ETL, 피처스토어 |
| **Back-End** | Java, Kotlin, Spring Framework, Spring JPA, Python |
| **Infra/DevOps** | Ansible, AWX, Jenkins, Docker, Mesos, K8s, Sentry, Git, Linux |
| **Front-End** | JavaScript, Node.js, Express, React, Webpack, jQuery |
| **DB** | MySQL, Oracle, MS-SQL, MongoDB, Redis |

---

## 발표 및 링크

- **if(kakao) 2018** 다음 모바일 첫 화면 개선기
  - 영상: https://tv.kakao.com/channel/3150758/cliplink/391418915
  - 자료: https://www.slideshare.net/ifkakao/ss-113145630
