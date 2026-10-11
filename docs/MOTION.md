# Motion 설정과 인터랙션

## 설치

[공식 Motion AI Kit](https://motion.dev/ai-kit)의 `motion-ai` 14.1.0 설치 기능으로 프로젝트를 설정했습니다.

- 스킬: `.agents/skills/motion/SKILL.md`와 참고 문서
- Codex MCP 설정: `.codex/config.toml`의 `motion`, `motion-plus`
- 브라우저 런타임: `motion` 14.0.0, `public/vendor/motion.js`
- MIT 라이선스: `public/vendor/motion-LICENSE.md`

설치된 스킬은 다음 Codex 대화에서 `/motion`으로 사용할 수 있습니다. MCP 설정 역시 새 세션에서 적용됩니다. 현재 세션에서 MCP 연결·로그인이나 MotionScore 분석을 실행한 것은 아닙니다. 이번 구현에는 설치된 스킬과 best-practices 문서를 적용했습니다.

스킬·Codex 설정은 개발용이며 `.vercelignore`로 배포에서 제외합니다. 사이트는 로컬 Motion 파일을 사용하여 외부 CDN 요청 없이 동작합니다.

## UX

- 첫 화면: 문구·사진의 짧은 등장과 핵심 문구 밑줄
- 사례: 입력 → AI 후보 → 사람의 검수 → 결과물의 4개 탭과 설명용 시각화
- 협업: 고민 선택에 따른 설명·문의 이메일 제목
- 교육: 발표 사진 확대, Escape 닫기, 원래 버튼으로 포커스 복원
- 탐색: 읽기 진행 표시, 현재 섹션 메뉴 표시, 한 번만 실행되는 섹션 등장

애니메이션은 opacity·transform 중심이며 반복 재생하지 않습니다. 시스템 동작 줄이기 설정을 따르고, 인쇄에서는 정적 화면을 표시합니다. JavaScript가 꺼지면 정적 업무 도식·전체 콘텐츠·사진 원본 링크를 제공합니다.

## 관리와 검증

```sh
npm ci
npm run vendor:motion
npm run check:profile
npm run export:profile
```

이미 설치된 Chrome을 사용할 경우 `CHROME_PATH`에 실행 파일 경로를 지정합니다. Motion 버전 변경 시 vendor 파일과 라이선스를 다시 복사합니다. 별도 빌드 없이 HTML·`public/` 자산을 배포합니다.

검증 스크립트는 실제 브라우저에서 탭 클릭·키보드 이동, 협업 선택, 사진 확대·포커스 복원, 현재 메뉴, 4개 화면 폭, 동작 줄이기·인쇄·JavaScript 비활성화 상태를 확인합니다.
