package com.example.eksamen3sem24h.controller;

import com.example.eksamen3sem24h.model.Result;
import com.example.eksamen3sem24h.model.Sailboat;
import com.example.eksamen3sem24h.service.ResultService;
import com.example.eksamen3sem24h.service.SailboatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin

public class ResultController {

    @Autowired
    ResultService resultservice;

    @PostMapping("/postResult")
    @ResponseStatus(HttpStatus.CREATED)
    public Result postData(@RequestBody Result result) {
        return resultservice.postData(result);
    }

    @GetMapping("/getAllResults")
    public List<Result> allData() {
        return resultservice.allData();
    }

    @PutMapping("/updateResult/{id}")
    public ResponseEntity<Result> updateRestaurant(@PathVariable int id, @RequestBody Result result) {
        return resultservice.updateData(id, result);
    }

    @DeleteMapping("/deleteResult/{id}")
    public ResponseEntity<Result> deleteData(@PathVariable int id) {
        return resultservice.deleteData(id);
    }


    @GetMapping("/getResultsByRace/{raceID}")
    public List<Result> getResultsByRace(@PathVariable int raceID) {
        return resultservice.findResultsByRaceID(raceID);
    }

}
