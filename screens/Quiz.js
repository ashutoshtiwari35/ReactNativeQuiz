import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const Quiz = ({ navigation }) => {
  const [qus, setQus] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showRightAnswer, setShowRightAnswer] = useState(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const getQuiz = async () => {
    setIsLoading(true);
    const url = "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";
    const res = await fetch(url);
    const data = await res.json();
    setQus(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const generateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);
    return options;
  }

  const handleNextPress = () => {
    setQues(ques + 1);
    setOptions(generateOptionsAndShuffle(qus[ques + 1]));
    setShowAnswer(false);
    setShowRightAnswer(false);
    setShowWrongAnswer(false);
  };

  const handleSelectedOption = (_option) => {
    if (_option === qus[ques].correct_answer) {
      setScore(score + 10);
      setShowRightAnswer(true);
      setShowAnswer(true);
    }
    else {
      setShowWrongAnswer(true);
      setShowAnswer(true);
    }
    // if (ques !== 9) {
    //   setQues(ques + 1);
    //   setOptions(generateOptionsAndShuffle(qus[ques + 1]));
    // }
    // if(ques === 9)
    // {
    //   handleShowResult();
    // }

  }

  const handleShowResult = () => {
    navigation.navigate("Result", {
      score: score
    })
  }
  return (

    <View style={styles.container}>
      {isLoading ? <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Text style={{ fontSize: 32, fontWeight: '700' }}>Loading...</Text></View>
        :
        qus &&
        <View style={styles.parent}>
          <View style={styles.top}>
            <Text style={styles.question}>Q.  {decodeURIComponent(qus[ques].question)}</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[0])}>
              <Text style={styles.option}>{decodeURIComponent(options[0])}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[1])}>
              <Text style={styles.option}>{decodeURIComponent(options[1])}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[2])}>
              <Text style={styles.option}>{decodeURIComponent(options[2])}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectedOption(options[3])}>
              <Text style={styles.option}>{decodeURIComponent(options[3])}</Text>
            </TouchableOpacity>
          </View>
          {
            showAnswer &&
            <View>
              <View style={styles.optionButton}>
                <Text style={styles.option}>
                  {
                    showRightAnswer ? "Your Answer is Right" :
                      "Your Answer is Wrong"
                  }
                </Text>
              </View>
              { showWrongAnswer && 
                <View style={styles.optionButton}>
                  <Text style={styles.option}>
                    {
                      showWrongAnswer ? `Your Right Answer is: ${decodeURIComponent(qus[ques].correct_answer)}` :
                        ""
                    }
                  </Text>
                </View>
              }
            </View>
          }
          <View style={styles.buttons}>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SKIP</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={handleShowResult} style={styles.button}>
              <Text style={styles.buttonText}>END</Text>
            </TouchableOpacity>
            {ques !== 9 && <TouchableOpacity onPress={() => handleNextPress()} style={styles.button}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
            }
            {ques === 9 && <TouchableOpacity onPress={handleShowResult} style={styles.button}>
              <Text style={styles.buttonText}>Show Results</Text>
            </TouchableOpacity>
            }
          </View>
        </View>
      }
    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%'
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1
  },
  buttons: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  button: {
    backgroundColor: "#1A759F",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white'
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: "#34A0A4",
    paddingHorizontal: 12,
    borderRadius: 12
  },
  parent: {
    height: '100%'
  }
})