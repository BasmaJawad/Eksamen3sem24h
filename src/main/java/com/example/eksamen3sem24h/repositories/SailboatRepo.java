package com.example.eksamen3sem24h.repositories;

import ch.qos.logback.core.model.Model;
import com.example.eksamen3sem24h.model.Enums.BoatType;
import com.example.eksamen3sem24h.model.Sailboat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SailboatRepo extends JpaRepository<Sailboat, Integer> {

    List<Sailboat> findSailboatByBoatType(BoatType boatType);
}
