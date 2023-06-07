package com.example.eksamen3sem24h.repositories;

import ch.qos.logback.core.model.Model;
import com.example.eksamen3sem24h.model.Race;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface RaceRepo extends JpaRepository<Race, Integer> {

    List<Race> findTop3ByDateAfterOrderByDateAsc(String currentDate);

}
