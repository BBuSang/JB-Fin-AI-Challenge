package com.naeilbank.prepayment;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/prepayments")
public class PrepaymentController {

    @GetMapping
    public List<Map<String, Object>> list() {
        return List.of(
                Map.of("id", 1, "name", "김영자", "businessName", "대박백반",
                        "amount", 3000000, "probability", 98.5,
                        "status", "approve", "statusLabel", "승인 권장"),
                Map.of("id", 2, "name", "이철수", "businessName", "행복카페",
                        "amount", 1500000, "probability", 72.0,
                        "status", "review", "statusLabel", "추가 검토"),
                Map.of("id", 3, "name", "박민수", "businessName", "성실분식",
                        "amount", 2200000, "probability", 95.2,
                        "status", "approve", "statusLabel", "승인 권장"),
                Map.of("id", 4, "name", "최영희", "businessName", "꽃집 봄",
                        "amount", 1800000, "probability", 65.0,
                        "status", "reject", "statusLabel", "승인 미달")
        );
    }

    @PostMapping("/{id}/approve")
    public Map<String, Object> approve(@PathVariable Long id, @RequestBody(required = false) Map<String, Object> body) {
        Object limit = body != null ? body.get("limit") : null;
        return Map.of(
                "id", id,
                "status", "APPROVED",
                "approvedLimit", limit != null ? limit : 0,
                "decidedAt", java.time.Instant.now().toString(),
                "message", "선지급 승인 처리되었습니다."
        );
    }
}
