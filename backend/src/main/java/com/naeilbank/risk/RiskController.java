package com.naeilbank.risk;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/risks")
public class RiskController {

    @GetMapping
    public Map<String, Object> list(@RequestParam(required = false, defaultValue = "all") String level) {
        List<Map<String, Object>> all = List.of(
                Map.of(
                        "id", 1, "level", "high",
                        "customerName", "이철수", "businessName", "행복카페",
                        "indicator", "매출 급감", "change", "-45%",
                        "detail", "최근 2주간 매출이 전월 대비 45% 감소",
                        "detected", "2시간 전", "suggestion", "정책자금 연결 권장"
                ),
                Map.of(
                        "id", 2, "level", "high",
                        "customerName", "박진수", "businessName", "맛있는분식",
                        "indicator", "연체 예상", "change", "D-7",
                        "detail", "현금흐름 분석 결과 7일 후 상환 어려움 예상",
                        "detected", "3시간 전", "suggestion", "상환 유예 상담 권장"
                ),
                Map.of(
                        "id", 3, "level", "medium",
                        "customerName", "최영희", "businessName", "꽃집 봄",
                        "indicator", "결제 지연", "change", "+3일",
                        "detail", "거래처 결제가 평균 대비 3일 지연",
                        "detected", "5시간 전", "suggestion", "모니터링 지속"
                ),
                Map.of(
                        "id", 4, "level", "medium",
                        "customerName", "김상호", "businessName", "충장철물",
                        "indicator", "시즌 영향", "change", "-20%",
                        "detail", "비수기 진입으로 매출 하락 예상",
                        "detected", "1일 전", "suggestion", "단기 운영자금 검토"
                ),
                Map.of(
                        "id", 5, "level", "watch",
                        "customerName", "이미경", "businessName", "미경미용실",
                        "indicator", "상권 변화", "change", "관찰",
                        "detail", "인근 대형마트 오픈으로 유동인구 변화 감지",
                        "detected", "2일 전", "suggestion", "추이 관찰"
                )
        );

        List<Map<String, Object>> filtered = "all".equals(level)
                ? all
                : all.stream().filter(a -> level.equals(a.get("level"))).toList();

        return Map.of(
                "summary", List.of(
                        Map.of("id", "all", "label", "전체", "count", 12),
                        Map.of("id", "high", "label", "고위험", "count", 3),
                        Map.of("id", "medium", "label", "주의", "count", 5),
                        Map.of("id", "watch", "label", "관찰", "count", 4),
                        Map.of("id", "safe", "label", "정상", "count", 142)
                ),
                "alerts", filtered
        );
    }

    @PostMapping("/{id}/action")
    public Map<String, Object> action(@PathVariable Long id) {
        return Map.of("id", id, "status", "ACTION_TAKEN");
    }
}
