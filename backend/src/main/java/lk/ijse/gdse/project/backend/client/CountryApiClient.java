package lk.ijse.gdse.project.backend.client;


import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Component
public class CountryApiClient {

    private final WebClient webClient;

    public CountryApiClient(WebClient webClient) {
        this.webClient = webClient;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> fetchCountries() {
        List<Map> rawList = webClient.get()
                .uri("/all?fields=name,capital,region,population,flags")
                .retrieve()
                .bodyToFlux(Map.class)
                .collectList()
                .block();

        return (List<Map<String, Object>>) (List<?>) rawList;
    }
}