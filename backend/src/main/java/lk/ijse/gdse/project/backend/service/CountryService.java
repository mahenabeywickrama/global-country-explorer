package lk.ijse.gdse.project.backend.service;


import lk.ijse.gdse.project.backend.client.CountryApiClient;
import lk.ijse.gdse.project.backend.dto.CountryDTO;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
public class CountryService {

    private final CountryApiClient apiClient;

    public CountryService(CountryApiClient apiClient) {
        this.apiClient = apiClient;
    }

    @Cacheable("countries") // cached in memory
    public List<CountryDTO> getAllCountries() {
        List<Map<String, Object>> rawList = apiClient.fetchCountries();
        List<CountryDTO> countries = new ArrayList<>();

        for (Map<String, Object> map : rawList) {
            countries.add(mapToDTO(map));
        }

        return countries;
    }

    public List<CountryDTO> searchCountries(String query) {
        if (query == null || query.isEmpty()) {
            return getAllCountries();
        }
        String lower = query.toLowerCase();
        List<CountryDTO> filtered = new ArrayList<>();
        for (CountryDTO c : getAllCountries()) {
            if (c.getName().toLowerCase().contains(lower) ||
                    c.getCapital().toLowerCase().contains(lower) ||
                    c.getRegion().toLowerCase().contains(lower)) {
                filtered.add(c);
            }
        }
        return filtered;
    }

    // safe mapping
    private CountryDTO mapToDTO(Map<String, Object> countryMap) {
        // name
        Map<String, Object> nameMap = (Map<String, Object>) countryMap.get("name");
        String name = nameMap != null ? (String) nameMap.get("common") : "N/A";

        // capital
        List<String> capitals = (List<String>) countryMap.get("capital");
        String capital = (capitals != null && !capitals.isEmpty()) ? capitals.get(0) : "N/A";

        // region
        String region = countryMap.get("region") != null ? (String) countryMap.get("region") : "N/A";

        // population
        Number pop = (Number) countryMap.get("population");
        int population = pop != null ? pop.intValue() : 0;

        // flag
        Map<String, Object> flagsMap = (Map<String, Object>) countryMap.get("flags");
        String flag = flagsMap != null ? (String) flagsMap.get("png") : "";

        return new CountryDTO(name, capital, region, population, flag);
    }
}