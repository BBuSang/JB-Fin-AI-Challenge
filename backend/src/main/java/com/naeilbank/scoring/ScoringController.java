package com.naeilbank.scoring;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scoring")
public class ScoringController {

    /**
     * 한도 슬라이더용 — 한도/정산예정액 비율에 따라 회수확률을 단순 보간.
     * 실제 운영에서는 FastAPI ML 서비스 호출로 교체.
     */
    @PostMapping("/simulate")
    public Map<String, Object> simulate(@RequestBody Map<String, Object> body) {
        long settlementAmount = ((Number) body.getOrDefault("settlementAmount", 3000000)).longValue();
        long requestedLimit = ((Number) body.getOrDefault("requestedLimit", settlementAmount)).longValue();
        double baseRate = ((Number) body.getOrDefault("baseRecoveryRate", 98.5)).doubleValue();

        long maxLimit = Math.round(settlementAmount * 0.92);
        double ratio = maxLimit == 0 ? 0 : (double) requestedLimit / maxLimit;
        double rate = baseRate - (1 - ratio) * 5;
        rate = Math.max(0, Math.min(100, rate));

        String signal = rate >= 95 ? "AUTO_APPROVE"
                : rate >= 80 ? "REVIEW"
                : "HOLD";

        return Map.of(
                "requestedLimit", requestedLimit,
                "maxLimit", maxLimit,
                "recoveryProbability", Math.round(rate * 10.0) / 10.0,
                "signal", signal,
                "modelVersion", "mock-v0.1"
        );
    }

    @GetMapping("/{prepaymentId}/shap")
    public Map<String, Object> shap(@PathVariable Long prepaymentId) {
        return Map.of(
                "prepaymentId", prepaymentId,
                "baseValue", 0.5,
                "factors", List.of(
                        Map.of("name", "최근 6개월 매출 안정성", "value", 0.28, "direction", "positive"),
                        Map.of("name", "지역화폐 결제 비율", "value", 0.22, "direction", "positive"),
                        Map.of("name", "과거 상환 이력", "value", 0.18, "direction", "positive"),
                        Map.of("name", "업종 평균 대비 매출", "value", 0.12, "direction", "positive"),
                        Map.of("name", "최근 카드 매출 변동", "value", -0.08, "direction", "negative"),
                        Map.of("name", "상권 위험도", "value", -0.05, "direction", "negative")
                ),
                "modelVersion", "mock-v0.1"
        );
    }
}
