import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillBar from './SkillBar';
import { Skill } from '../../types/types';
import { describe, test } from '@jest/globals';

describe('render SkillBar Component', () => {

  const mockSkills: Skill[] = [
    { name: 'React', level: 5 },
    { name: 'TypeScript', level: 4 },
    { name: 'JavaScript', level: 5 },
    { name: 'CSS', level: 3 },
    { name: 'Node.js', level: 4 }
  ];

  test('should render all skill names correctly', () => {
    render(<SkillBar skills={mockSkills} />);
    
    mockSkills.forEach(skill => {
      const nameElement = screen.getByTestId(`skillname-${skill.name}`);
      expect(nameElement).toBeInTheDocument();
      expect(nameElement).toHaveTextContent(skill.name);
    });
  });

  test('should render correct number of level dots for each skill', () => {
    render(<SkillBar skills={mockSkills} />);
    
    mockSkills.forEach(skill => {
      const levelElement = screen.getByTestId(`skilllevel-${skill.name}`);
      expect(levelElement).toBeInTheDocument();
      
      const blueDots = within(levelElement).getAllByRole('generic').filter(
        el => el.className.includes('bg-blue-600')
      );
      
      expect(blueDots).toHaveLength(skill.level);
    });
  });

  test('should render React skill with 5 level dots', () => {
    render(<SkillBar skills={mockSkills} />);
    
    const reactSkill = mockSkills.find(s => s.name === 'React')!;
    const levelElement = screen.getByTestId(`skilllevel-${reactSkill.name}`);
    
    const blueDots = within(levelElement).getAllByRole('generic').filter(
      el => el.className.includes('bg-blue-600')
    );
    
    expect(blueDots).toHaveLength(5);
  });

  test('should render TypeScript skill with 4 level dots', () => {
    render(<SkillBar skills={mockSkills} />);
    
    const tsSkill = mockSkills.find(s => s.name === 'TypeScript')!;
    const levelElement = screen.getByTestId(`skilllevel-${tsSkill.name}`);
    
    const blueDots = within(levelElement).getAllByRole('generic').filter(
      el => el.className.includes('bg-blue-600')
    );
    
    expect(blueDots).toHaveLength(4);
  });

  test('should render CSS skill with 3 level dots', () => {
    render(<SkillBar skills={mockSkills} />);
    
    const cssSkill = mockSkills.find(s => s.name === 'CSS')!;
    const levelElement = screen.getByTestId(`skilllevel-${cssSkill.name}`);
    
    const blueDots = within(levelElement).getAllByRole('generic').filter(
      el => el.className.includes('bg-blue-600')
    );
    
    expect(blueDots).toHaveLength(3);
  });

  test('should render all skills with their respective components', () => {
    render(<SkillBar skills={mockSkills} />);
    
    mockSkills.forEach(skill => {
      expect(screen.getByTestId(`skillname-${skill.name}`)).toBeInTheDocument();
      expect(screen.getByTestId(`skilllevel-${skill.name}`)).toBeInTheDocument();
    });
  });

  describe('run skill bar edge cases', () => {

    test('should render skill with level 1', () => {
      const singleLevelSkill: Skill[] = [{ name: 'Beginner Skill', level: 1 }];
      render(<SkillBar skills={singleLevelSkill} />);
      
      const levelElement = screen.getByTestId(`skilllevel-Beginner Skill`);
      const blueDots = within(levelElement).getAllByRole('generic').filter(
        el => el.className.includes('bg-blue-600')
      );
      
      expect(blueDots).toHaveLength(1);
    });

    test('should render skill with maximum level', () => {
      const maxLevelSkill: Skill[] = [{ name: 'Expert Skill', level: 5 }];
      render(<SkillBar skills={maxLevelSkill} />);
      
      const levelElement = screen.getByTestId(`skilllevel-Expert Skill`);
      const blueDots = within(levelElement).getAllByRole('generic').filter(
        el => el.className.includes('bg-blue-600')
      );
      
      expect(blueDots).toHaveLength(5);
    });

    test('should render empty skills array', () => {
      render(<SkillBar skills={[]} />);
      
      const skillNames = screen.queryAllByTestId(/skillname-/);
      const skillLevels = screen.queryAllByTestId(/skilllevel-/);
      
      expect(skillNames).toHaveLength(0);
      expect(skillLevels).toHaveLength(0);
    });

    test('should handle skills with special characters in names', () => {
      const specialSkills: Skill[] = [
        { name: 'C++', level: 4 },
        { name: 'Node.js', level: 3 },
        { name: 'Vue.js 3', level: 2 }
      ];
      
      render(<SkillBar skills={specialSkills} />);
      
      specialSkills.forEach(skill => {
        const nameElement = screen.getByTestId(`skillname-${skill.name}`);
        expect(nameElement).toBeInTheDocument();
        
        const levelElement = screen.getByTestId(`skilllevel-${skill.name}`);
        const blueDots = within(levelElement).getAllByRole('generic').filter(
          el => el.className.includes('bg-blue-600')
        );
        expect(blueDots).toHaveLength(skill.level);
      });
    });
  });

  describe('skill bar level consistency', () => {
    test('should maintain correct level count across multiple renders', () => {
      const { rerender } = render(<SkillBar skills={mockSkills} />);
      
      mockSkills.forEach(skill => {
        const levelElement = screen.getByTestId(`skilllevel-${skill.name}`);
        const blueDots = within(levelElement).getAllByRole('generic').filter(
          el => el.className.includes('bg-blue-600')
        );
        expect(blueDots).toHaveLength(skill.level);
      });
      
      // Re-render with same data
      rerender(<SkillBar skills={mockSkills} />);
      
      mockSkills.forEach(skill => {
        const levelElement = screen.getByTestId(`skilllevel-${skill.name}`);
        const blueDots = within(levelElement).getAllByRole('generic').filter(
          el => el.className.includes('bg-blue-600')
        );
        expect(blueDots).toHaveLength(skill.level);
      });
    });

    test('should update level count when skills change', () => {
      const initialSkills: Skill[] = [{ name: 'React', level: 3 }];
      const updatedSkills: Skill[] = [{ name: 'React', level: 5 }];
      
      const { rerender } = render(<SkillBar skills={initialSkills} />);
      
      let levelElement = screen.getByTestId(`skilllevel-React`);
      let blueDots = within(levelElement).getAllByRole('generic').filter(
        el => el.className.includes('bg-blue-600')
      );
      expect(blueDots).toHaveLength(3);
      
      rerender(<SkillBar skills={updatedSkills} />);
      
      levelElement = screen.getByTestId(`skilllevel-React`);
      blueDots = within(levelElement).getAllByRole('generic').filter(
        el => el.className.includes('bg-blue-600')
      );
      expect(blueDots).toHaveLength(5);
    });
  });
});