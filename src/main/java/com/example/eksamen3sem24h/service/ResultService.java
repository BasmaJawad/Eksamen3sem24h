package com.example.eksamen3sem24h.service;

import com.example.eksamen3sem24h.model.Result;
import com.example.eksamen3sem24h.model.Sailboat;
import com.example.eksamen3sem24h.repositories.ResultRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResultService {

    @Autowired
    ResultRepo resultRepo;

    public Result postData(Result result) {
        return resultRepo.save(result);
    }


    public List<Result> allData() {
        return resultRepo.findAll();
    }

    public ResponseEntity<Result> updateData(int id, Result result){
        Optional<Result> resultOptional = resultRepo.findById(id);

        if (resultOptional.isPresent()) {
            resultRepo.save(result);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Result> deleteData(int id){

        Optional<Result> resultOptional = resultRepo.findById(id);

        if (resultOptional.isPresent()) {
            resultRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
