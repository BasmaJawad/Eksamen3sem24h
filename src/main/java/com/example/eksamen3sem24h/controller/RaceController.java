package com.example.eksamen3sem24h.controller;

import com.example.eksamen3sem24h.model.Race;
import com.example.eksamen3sem24h.model.Result;
import com.example.eksamen3sem24h.service.RaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class RaceController {

    @Autowired
    RaceService raceservice;

    @PostMapping("/postRace")
    @ResponseStatus(HttpStatus.CREATED)
    public Race postData(@RequestBody Race race) {
        return raceservice.postData(race);
    }

    @GetMapping("/getAllRaces")
    public List<Race> allData() {
        return raceservice.allData();
    }

    @PutMapping("/updateRace/{id}")
    public ResponseEntity<Race> updateRestaurant(@PathVariable int id, @RequestBody Race race) {
        return raceservice.updateData(id, race);
    }

    @DeleteMapping("/deleteRace/{id}")
    public ResponseEntity<Race> deleteData(@PathVariable int id) {
        return raceservice.deleteData(id);
    }


}
