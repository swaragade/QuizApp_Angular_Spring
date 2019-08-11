package com.telenet.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.telenet.entity.Question;
import com.telenet.model.QuestionModel;
import com.telenet.persistance.QueRepo;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TestController {

	@Autowired
	public QueRepo dao;

	@GetMapping(path = "/getCategoryList", produces = { "application/json" })
	public List<String> getCategory() {
		return dao.findCategories();
		
	}
	@GetMapping(path = "/getLevelList", produces = { "application/json" })
	public List<String> getLevelList() {
		return dao.findLevels();
		
	}

	@PostMapping(path = "/getQueByType", produces = { "application/json" })
	public List<QuestionModel> getQueByType(@RequestBody QuestionModel queMod) {
		
		List<QuestionModel> queModList = new ArrayList<QuestionModel>();
		List<Question> queList = dao.findByType(queMod.getCategory(), queMod.getLevel());
		if (queList != null) {
			for (Question que : queList) {
				QuestionModel quesModel = new QuestionModel();
				quesModel.setQid(new Integer(que.getqID()).toString());
				quesModel.setQuestion(que.getQueString());
				String[] options = que.getOptions().trim().split(",");
				quesModel.setOptions(Arrays.asList(options));
				String[] answers = que.getAnswers().trim().split(",");
				quesModel.setAnswers(Arrays.asList(answers));
				quesModel.setCategory(que.getCategory());
				quesModel.setLevel(que.getLevel());

				queModList.add(quesModel);
			}
		}
		System.out.println(queModList);
		return queModList;
	}

	@PostMapping(path = "/validateAns", produces = { "application/json" })
	public boolean validateAnswer(@RequestBody QuestionModel queMod) {
		if (queMod != null && queMod.getQid() != null) {
			String[] actualAnswer = dao.findByQID(Integer.parseInt(queMod.getQid())).getAnswers().trim().toLowerCase()
					.split(",");
			List<String> actualAnswerList = Arrays.asList(actualAnswer);

			if (actualAnswerList.containsAll(queMod.getAnswers())) {
				System.out.println("TRUE");
				return true;
			}
		}
		System.out.println("FALSE");
		return false;
	}

}
