# 공유 이미지와 프로필 PDF 갱신

`index.html`을 수정한 뒤 다음 명령으로 다운로드 PDF와 OG 이미지를 갱신합니다.

```sh
npm ci
npx playwright install chromium
npm run export:profile
```

설치된 Chrome을 사용하려면 브라우저 설치 단계 대신 다음과 같이 실행합니다.

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run export:profile
```

- PDF: 동작 줄이기 설정과 `index.html`의 인쇄 스타일을 적용하며 로컬 시스템 글꼴과 이미지가 준비된 뒤 생성합니다. 인터랙티브 도식 대신 정적 업무 흐름을 표시하고 이전 경력도 포함합니다.
- OG 이미지: `scripts/og-template.html`에서 1200×630 PNG로 생성합니다. 핵심 문구를 변경하면 이 템플릿도 함께 수정합니다. 외부 폰트 요청 없이 시스템 글꼴로 생성합니다.
- 결과: `public/jaesung-ko-profile.pdf`, `public/og-profile.png`
- 배포 시 HTML과 두 파일을 함께 반영합니다. 공유 서비스에 캐시된 미리보기는 갱신에 시간이 걸릴 수 있습니다.
