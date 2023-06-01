package com.example.eksamen3sem24h.repositories;

import ch.qos.logback.core.model.Model;
import com.example.eksamen3sem24h.model.Race;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RaceRepo extends JpaRepository<Race, Integer> {
}
