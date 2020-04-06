import A_grade from '../images/A.png';
import B_grade from '../images/B.png';
import C_grade from '../images/C.png';
import D_grade from '../images/D.png';
import E_grade from '../images/E.png';

export default grade => {
    const grades = {
        A: A_grade,
        B: B_grade,
        C: C_grade,
        D: D_grade,
        E: E_grade
    };
    return grades[grade];
};
