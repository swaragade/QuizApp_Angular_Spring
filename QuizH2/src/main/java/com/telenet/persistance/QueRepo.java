package com.telenet.persistance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.telenet.entity.Question;

public interface QueRepo extends JpaRepository<Question, Integer>{

	@Query("from Question where category=?1 and level=?2")
	public List<Question> findByType(String category, int level);
	
	public Question findByQID(int qID);

	@Query(value =  "SELECT DISTINCT category FROM Question" , nativeQuery = true)
	public List<String> findCategories();
	
	@Query(value =  "SELECT DISTINCT level FROM Question" , nativeQuery = true)
	public List<String> findLevels();
}
