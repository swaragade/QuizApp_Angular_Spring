package com.telenet.model;

import java.util.ArrayList;
import java.util.List;

public class QuestionModel {

	private String qid;
	private String question;
	private List<String> options = new ArrayList<>();
	private List<String> answers= new ArrayList<>();
	private String category;
	private int level;
	public String getQid() {
		return qid;
	}
	public void setQid(String qid) {
		this.qid = qid;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public List<String> getOptions() {
		return options;
	}
	public void setOptions(List<String> options) {
		this.options = options;
	}
	public List<String> getAnswers() {
		return answers;
	}
	public void setAnswers(List<String> answers) {
		this.answers = answers;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	@Override
	public String toString() {
		return "QuestionModel [qid=" + qid + ", question=" + question + ", options=" + options + ", answers=" + answers
				+ ", category=" + category + ", level=" + level + "]";
	}

}
