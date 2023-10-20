package com.backend.exam.dina.models;
import javax.persistence.*;
@Entity
@Table(name = "tablaExamen_campos")
public class TablaExamenCampo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tabla_examen_id")
    private TablaExamen tablaExamen;
    @Column(name = "campo", columnDefinition = "TEXT")
    private String campo;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public TablaExamen getTablaExamen() {
        return tablaExamen;
    }
    public void setTablaExamen(TablaExamen tablaExamen) {
        this.tablaExamen = tablaExamen;
    }
    public String getCampo() {
        return campo;
    }
    public void setCampo(String campo) {
        this.campo = campo;
    }
}