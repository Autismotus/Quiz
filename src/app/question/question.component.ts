import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      
    }
    if (option.correct) {
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.getProgressPercent();
      }, 1000);
      
    }
    else {
      setTimeout(() => {
      this.currentQuestion++;
      this.inCorrectAnswer++;
      this.getProgressPercent();
    }, 1000);
    }
  }
  resetQuiz() {
    this.getAllQuestions();
    this.currentQuestion = 0;
    this.progress = "0";
  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }
}
