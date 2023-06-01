package com.example.eksamen3sem24h.config;

import com.example.eksamen3sem24h.model.Enums.BoatType;
import com.example.eksamen3sem24h.model.Race;
import com.example.eksamen3sem24h.model.Result;
import com.example.eksamen3sem24h.model.Sailboat;
import com.example.eksamen3sem24h.repositories.RaceRepo;
import com.example.eksamen3sem24h.repositories.ResultRepo;
import com.example.eksamen3sem24h.repositories.SailboatRepo;
import com.example.eksamen3sem24h.service.RaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class initData implements CommandLineRunner {

    @Autowired
    RaceRepo raceRepo;

    @Autowired
    SailboatRepo sailboatRepo;

    @Autowired
    ResultRepo resultRepo;

    @Override
    public void run(String... args) throws Exception {

        Sailboat sailboat = new Sailboat();
        sailboat.setBoatType(BoatType.LONGERTHAN40);
        sailboat.setName("F24");
        sailboatRepo.save(sailboat);

        Sailboat sailboat2 = new Sailboat();
        sailboat2.setBoatType(BoatType.SMALLERTHAN25);
        sailboat2.setName("Bæveren");
        sailboatRepo.save(sailboat2);

        Sailboat sailboat3 = new Sailboat();
        sailboat3.setBoatType(BoatType.FROM25TO40);
        sailboat3.setName("Blå Svane");
        sailboatRepo.save(sailboat3);



        Race race1 = new Race();
        race1.setBoatType(BoatType.LONGERTHAN40);
        race1.setDate("2023-05-03");
        raceRepo.save(race1);

        Race race2 = new Race();
        race2.setBoatType(BoatType.SMALLERTHAN25);
        race2.setDate("2023-05-03");
        raceRepo.save(race2);

        Race race3 = new Race();
        race3.setBoatType(BoatType.FROM25TO40);
        race3.setDate("2023-05-03");
        raceRepo.save(race3);



        Result result1 = new Result();
        result1.setSailboat(sailboat);
        result1.setRace(race1);
        result1.setPosition("2. plads");
        result1.setPoints(2);
        resultRepo.save(result1);

        Result result2 = new Result();
        result2.setSailboat(sailboat2);
        result2.setRace(race2);
        result2.setPosition("8. plads");
        result2.setPoints(8);
        resultRepo.save(result2);

        Result result3 = new Result();
        result3.setSailboat(sailboat3);
        result3.setRace(race3);
        result3.setPosition("Ikke fuldført");
        result3.setPoints(14);
        resultRepo.save(result3);


    }
}
