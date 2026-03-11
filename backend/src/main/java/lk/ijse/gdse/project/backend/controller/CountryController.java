package lk.ijse.gdse.project.backend.controller;

import lk.ijse.gdse.project.backend.dto.CountryDTO;
import lk.ijse.gdse.project.backend.service.CountryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final CountryService service;

    public CountryController(CountryService service) {
        this.service = service;
    }

    @GetMapping
    public List<CountryDTO> getCountries() {
        return service.getAllCountries();
    }

    @GetMapping("/search")
    public List<CountryDTO> search(@RequestParam String q) {
        return service.searchCountries(q);
    }
}