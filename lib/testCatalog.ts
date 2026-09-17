export type TestCatalogItem = {
  slug: "personality" | "career" | "stress" | "other";
  title: string;
  tagline: string;
  duration: string;
  format: string;
  description: string;
  goodFor: string[];
};

export const TEST_CATALOG: TestCatalogItem[] = [
  {
    slug: "personality",
    title: "성격검사",
    tagline: "나를 이루는 성향과 강점을 이해해요",
    duration: "약 40~60분",
    format: "온라인 자기보고식 검사 + 1:1 해석상담",
    description:
      "표준화된 성격 척도를 통해 기질, 대인관계 패턴, 스트레스 대처 방식을 살펴보고, 전문 상담사와 함께 결과를 해석합니다.",
    goodFor: ["자기이해를 높이고 싶은 분", "대인관계 패턴을 점검하고 싶은 분"],
  },
  {
    slug: "career",
    title: "진로적성검사",
    tagline: "강점을 살린 진로 방향을 탐색해요",
    duration: "약 50~70분",
    format: "온라인 적성·흥미 검사 + 1:1 해석상담",
    description:
      "흥미, 적성, 가치관을 다각도로 진단하여 진로 선택이나 전환의 방향을 함께 탐색하고 구체적인 실행 계획을 세웁니다.",
    goodFor: ["진로를 고민 중인 학생", "이직·전직을 고려하는 직장인"],
  },
  {
    slug: "stress",
    title: "정서·스트레스 척도",
    tagline: "현재의 정서 상태를 점검해요",
    duration: "약 20~30분",
    format: "온라인 자기보고식 척도 + 1:1 해석상담",
    description:
      "불안, 우울, 스트레스 수준을 표준화된 척도로 측정하고, 결과를 바탕으로 필요한 관리 방법이나 추가 상담 방향을 안내합니다.",
    goodFor: ["최근 스트레스가 심해진 분", "정서 상태를 정기적으로 점검하고 싶은 분"],
  },
  {
    slug: "other",
    title: "기타 맞춤 검사",
    tagline: "필요에 맞는 검사를 함께 정해요",
    duration: "상담 후 결정",
    format: "사전 상담을 통해 적합한 검사 안내",
    description:
      "위 목록에 없는 특정 목적(예: 부부·가족 검사, 발달 검사 등)이 있다면 신청서에 자유롭게 남겨주세요. 사전 상담을 통해 가장 적합한 검사를 안내해드립니다.",
    goodFor: ["어떤 검사가 필요한지 잘 모르겠는 분"],
  },
];
