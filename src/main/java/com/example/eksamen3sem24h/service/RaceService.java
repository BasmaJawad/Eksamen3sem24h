package com.example.eksamen3sem24h.service;

import com.example.eksamen3sem24h.model.Race;
import com.example.eksamen3sem24h.model.Sailboat;
import com.example.eksamen3sem24h.repositories.RaceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RaceService {

    @Autowired
    RaceRepo raceRepo;


    public Race postData(Race race) {
        return raceRepo.save(race);
    }


    public List<Race> allData() {
        return raceRepo.findAll();
    }

    public ResponseEntity<Race> updateData(int id, Race race){
        Optional<Race> raceOptional = raceRepo.findById(id);

        if (raceOptional.isPresent()) {
            raceRepo.save(race);
            return new ResponseEntity<>(race, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Race> deleteData(int id){

        Optional<Race> raceOptional = raceRepo.findById(id);

        if (raceOptional.isPresent()) {
            raceRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
