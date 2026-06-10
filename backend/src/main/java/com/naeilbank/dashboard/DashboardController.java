package com.naeilbank.dashboard;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/summary")
    public Map<String, Object> summary() {
        return Map.of(
                "cards", List.of(
                        Map.of("title", "오늘의 승인 추천", "value", "12건", "trend", "+2건 대비 어제", "color", "blue"),
                        Map.of("title", "검토 필요", "value", "3건", "color", "yellow"),
                        Map.of("title", "회수 완료 (오늘)", "value", "1.2억", "color", "")
                ),
                "alerts", List.of(
                        Map.of(
                                "id", 1, "type", "warning",
                                "title", "김철수 (행복카페)",
                                "message", "매출 급감 감지 - 연체 위험 사전 경고",
                                "time", "10분 전", "action", "연착륙 검토"
                        ),
                        Map.of(
                                "id", 2, "type", "opportunity",
                                "title", "박민수 (성실분식)",
                                "message", "정산예정 320만원 - 선지급 적합",
                                "time", "30분 전", "action", "승인 검토"
                        ),
                        Map.of(
                                "id", 3, "type", "policy",
                                "title", "이영희 (꽃집 봄)",
                                "message", "소상공인 긴급경영자금 자격 충족",
                                "time", "1시간 전", "action", "정책 연결"
                        )
                )
        );
    }
}
