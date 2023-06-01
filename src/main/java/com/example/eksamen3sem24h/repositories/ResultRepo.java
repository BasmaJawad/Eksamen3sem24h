package com.example.eksamen3sem24h.repositories;

import ch.qos.logback.core.model.Model;
import com.example.eksamen3sem24h.model.Race;
import com.example.eksamen3sem24h.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepo extends JpaRepository<Result, Integer> {

    List<Result> findResultByRaceId(int raceID);

}
