package com.labsystem.repositories;

import com.labsystem.models.TablaExamen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface TablaExamenRepository extends JpaRepository<TablaExamen, Integer> {
    List<TablaExamen> findByCampo1(String campo1);
    List<TablaExamen> findByPacienteId(Integer pacienteId);
}
