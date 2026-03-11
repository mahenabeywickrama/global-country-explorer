package lk.ijse.gdse.project.backend.dto;

public class CountryDTO {
    private String name;
    private String capital;
    private String region;
    private int population;
    private String flag;

    public CountryDTO() {}

    public CountryDTO(String name, String capital, String region, int population, String flag) {
        this.name = name;
        this.capital = capital;
        this.region = region;
        this.population = population;
        this.flag = flag;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCapital() { return capital; }
    public void setCapital(String capital) { this.capital = capital; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public int getPopulation() { return population; }
    public void setPopulation(int population) { this.population = population; }
    public String getFlag() { return flag; }
    public void setFlag(String flag) { this.flag = flag; }
}