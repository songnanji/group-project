package com.mysite.demo1;

import com.mysite.demo1.question.QuestionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class Demo1ApplicationTests {

	@Autowired
	private QuestionService questionService;

	@Test
	void testJpa() {
		for (int i = 1; i <= 300; i++) {
			String subject = String.format("테스트 데이터입니다:[%03d]", i);
			String content = "내용무";
			this.questionService.create(subject, content);
		}
	}

//	@Autowired
//	private QuestionRepository questionRepository;
//
//	@Test
//	@Transactional(propagation = Propagation.NOT_SUPPORTED) // 트랜잭션 비활성화
//	void testJpa() {
//
//
//		Question q1 = new Question();
//		q1.setSubject("sbb가 무엇인가요?");
//		q1.setContent("sbb에 대해서 알고 싶습니다.");
//		q1.setCreateDate(LocalDateTime.now());
//		this.questionRepository.save(q1);  // 첫번째 질문 저장
//
//		Question q2 = new Question();
//		q2.setSubject("스프링부트 모델 질문입니다.");
//		q2.setContent("id는 자동으로 생성되나요?");
//		q2.setCreateDate(LocalDateTime.now());
//		this.questionRepository.save(q2);  // 두번째 질문 저장

//		List<Question> all = questionRepository.findAll();
//		assertEquals(2, all.size());
//
//		Question q = all.get(0);
//		assertEquals("sbb가 무엇인가요?", q.getSubject()
//
//		Optional<Question> oq = this.questionRepository.findById(1);
//		if (oq.isPresent()){
//			Question qq = oq.get();
//			assertThat("sbb가 무엇인가요?").isEqualTo(qq.getSubject());
//		}
	}




//	@Transactional
//	@Test
//	void testJpa(){
//		Optional<Question> oq = this.questionRepository.findById(2);
//		assertTrue(oq.isPresent());
//		Question q = oq.get();
//
//		List<Answer> answerList = q.getAnswerList();
//
//		assertEquals(1, answerList.size());
//		assertEquals("네 자동으로 생성됩니다.", answerList.get(0).getContent());
//	}
//	@Test
//	public void testCreateAndSaveQuestion() {
//		// 엔티티 생성 및 설정
//		Question q1 = new Question();
//		q1.setSubject("Test Subject 1");
//		q1.setContent("Test Content 1");
//		q1.setCreateDate(LocalDateTime.now());
//
//		// 저장
//		questionRepository.save(q1);
//
//		// 엔티티 검증
//		assertThat(q1.getId()).isNotNull(); // ID가 자동으로 생성되었는지 확인
//		assertThat(q1.getSubject()).isEqualTo("Test Subject 1");
//	}
//
//	@Test
//	public void testFindAllQuestions() {
//		// 데이터 삽입
//		Question q2 = new Question();
//		q2.setSubject("Test Subject 2");
//		q2.setContent("Test Content 2");
//		q2.setCreateDate(LocalDateTime.now());
//		questionRepository.save(q2);
//
//		// 데이터베이스에서 모든 질문 가져오기
//		var questions = questionRepository.findAll();
//		assertThat(questions).isNotEmpty(); // 비어있지 않음을 검증
//	}

