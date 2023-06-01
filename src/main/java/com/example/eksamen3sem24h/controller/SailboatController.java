package com.example.eksamen3sem24h.controller;

import ch.qos.logback.core.model.Model;
import com.example.eksamen3sem24h.model.Sailboat;
import com.example.eksamen3sem24h.service.SailboatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class SailboatController {



    @Autowired
    SailboatService sailboatservice;

    @PostMapping("/postSailboat")
    @ResponseStatus(HttpStatus.CREATED)
    public Sailboat postData(@RequestBody Sailboat sailboat) {
        return sailboatservice.postData(sailboat);
    }

    @GetMapping("/getAllBoats")
    public List<Sailboat> allData() {
        return sailboatservice.allData();
    }

    @PutMapping("/updateBoat/{id}")
    public ResponseEntity<Sailboat> updateRestaurant(@PathVariable int id, @RequestBody Sailboat sailboat) {
        return sailboatservice.updateData(id, sailboat);
    }

    @DeleteMapping("/deleteBoat/{id}")
    public ResponseEntity<Sailboat> deleteData(@PathVariable int id) {
        return sailboatservice.deleteData(id);
    }
}


