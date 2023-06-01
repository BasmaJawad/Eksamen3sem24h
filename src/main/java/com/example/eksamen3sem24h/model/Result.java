package com.example.eksamen3sem24h.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int points;

    private String position;

    @ManyToOne
    @JoinColumn(name = "raceID", referencedColumnName = "id")
    private Race race;
    @ManyToOne
    @JoinColumn(name = "boatID", referencedColumnName = "id")
    private Sailboat sailboat;

}
