package com.example.eksamen3sem24h.service;

import com.example.eksamen3sem24h.model.Sailboat;
import com.example.eksamen3sem24h.repositories.SailboatRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SailboatServiceTest {


    @Test
    void postData() {

        SailboatService sailboatService = mock(SailboatService.class);
        when(sailboatService.postData(any(Sailboat.class)))
                .thenReturn(new Sailboat())
                .thenReturn(null);

        Sailboat sailboat1 = new Sailboat();
        sailboat1.setName("Boat1");

        Sailboat sailboat2 = new Sailboat();
        sailboat2.setName("Boat1");

        Sailboat result1 = sailboatService.postData(sailboat1);
        Sailboat result2 = sailboatService.postData(sailboat2);

        System.out.println(result1);
        System.out.println(result2);

        assertNotNull(result1);
        assertNull(result2);
    }

    @Test
    void testLocalDate(){
        LocalDate currentDate = LocalDate.now();
        System.out.println(currentDate);

    }
}