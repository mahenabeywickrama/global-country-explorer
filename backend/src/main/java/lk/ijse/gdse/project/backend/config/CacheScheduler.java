package lk.ijse.gdse.project.backend.config;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CacheScheduler {

    private final CacheManager cacheManager;

    public CacheScheduler(CacheManager cacheManager){
        this.cacheManager = cacheManager;
    }

    @Scheduled(fixedRate = 600000)
    public void clearCache(){

        Cache cache = cacheManager.getCache("countries");

        if(cache != null){
            cache.clear();
        }

    }

}
