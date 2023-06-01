package com.example.eksamen3sem24h.service;

import ch.qos.logback.core.model.Model;
import com.example.eksamen3sem24h.model.Enums.BoatType;
import com.example.eksamen3sem24h.model.Sailboat;
import com.example.eksamen3sem24h.repositories.SailboatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class SailboatService {

    @Autowired
    SailboatRepo sailboatRepo;


    public Sailboat postData(Sailboat sailboat) {
        return sailboatRepo.save(sailboat);
    }


    public List<Sailboat> allData() {
        return sailboatRepo.findAll();
    }

    public ResponseEntity<Sailboat> updateData(int id, Sailboat sailboat){
        Optional<Sailboat> boatOptional = sailboatRepo.findById(id);

        if (boatOptional.isPresent()) {
            sailboatRepo.save(sailboat);
            return new ResponseEntity<>(sailboat, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Sailboat> deleteData(int id){

        Optional<Sailboat> boatOptional = sailboatRepo.findById(id);

        if (boatOptional.isPresent()) {
            sailboatRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public List<Sailboat> findSailboatByBoatType(@PathVariable BoatType boatType) {
        return sailboatRepo.findSailboatByBoatType(boatType);
    }

}
