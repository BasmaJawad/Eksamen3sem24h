package com.example.eksamen3sem24h.model;

import com.example.eksamen3sem24h.model.Enums.BoatType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Race {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String date;

    private BoatType boatType;

    @OneToMany(mappedBy = "race")
    @JsonBackReference
    private Set<Result> results = new HashSet<>();


}
