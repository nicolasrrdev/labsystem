package com.backend.exam.dina.repositories;
import com.backend.exam.dina.models.TablaExamen;
import com.backend.exam.dina.models.TablaExamenCampo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface TablaExamenRepository extends JpaRepository<TablaExamen, Integer> {
    @Query("SELECT te FROM TablaExamen te WHERE te.paciente.id = :pacienteId")
    List<TablaExamen> findByPacienteId(@Param("pacienteId") Integer pacienteId);
    @Query("SELECT tec FROM TablaExamenCampo tec JOIN tec.tablaExamen te WHERE te.paciente.id = :pacienteId")
    List<TablaExamenCampo> findByPacienteIdWithCampos(@Param("pacienteId") Integer pacienteId);
    @Query("SELECT tec FROM TablaExamenCampo tec")
    List<TablaExamenCampo> findAllCampos();
}