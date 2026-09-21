import { Component } from '@angular/core';

interface Part {
  partNumber: string;
  quantity: string;
  description: string;
}

@Component({
  selector: 'app-work-order-template',
  templateUrl: './work-order-template.component.html',
  styleUrls: ['./work-order-template.component.css']
})
export class WorkOrderTemplateComponent {

  // Response time
  responseTimeEnabled: boolean = true;

  // Product history
  damagedItem: string = '';
  replacementPart: string = '';

  // ADP
  adpEnabled: boolean = false;

  // Parts
  parts: Part[] = [
    {
      partNumber: '',
      quantity: '1',
      description: ''
    }
  ];

  // Generated result
  generatedText: string = '';

  /**
   * Generate Work Order Instructions
   */
  generateTemplate(): void {

    const sections: string[] = [];

    // Header
    sections.push('Work Order Instructions');

    sections.push(
      '************NOTE TO TECHNICIAN************'
    );

    // Response time
    if (this.responseTimeEnabled) {
      sections.push('Response time set: NBD');
    }

    // Product History Summary
    if (
      this.damagedItem.trim() !== '' ||
      this.replacementPart.trim() !== ''
    ) {
      const damaged = this.damagedItem.trim();
      const replacement = this.replacementPart.trim();

      sections.push(
        `PRODUCT HISTORY SUMMARY: ${damaged} : please mandatory replacing the ${replacement}`
      );
    }

    // ADP
    if (this.adpEnabled) {
      sections.push('ADP: Accidental damage coverage');
    }

    // Recommended parts
    this.parts.forEach((part) => {

      const partNumber = part.partNumber.trim();
      const quantity = part.quantity.trim();
      const description = part.description.trim();

      // Ignore completely empty part blocks
      if (
        partNumber === '' &&
        quantity === '' &&
        description === ''
      ) {
        return;
      }

      sections.push(
        `Recommended Part List: ${partNumber}`
      );

      sections.push(
        `QTY of each part: ${quantity || '1'}`
      );

      sections.push(
        `Part Description: ${description}`
      );
    });

    // Fixed HPCE / Partner information
    sections.push(
      'HPCE/Partner: If issue persists contact Tech Assist while you’re ONSITE at 800-477-6222, press 1 for Tech Assist'
    );

    this.generatedText = sections.join('\n\n');
  }

  /**
   * Add another recommended part
   */
  addPart(): void {
    this.parts.push({
      partNumber: '',
      quantity: '1',
      description: ''
    });
  }

  /**
   * Remove a part
   */
  removePart(index: number): void {

    // Keep at least one part block
    if (this.parts.length === 1) {
      return;
    }

    this.parts.splice(index, 1);
  }

  /**
   * Copy generated template
   */
  copyTemplate(): void {

    if (this.generatedText.trim() === '') {
      alert('Please generate the template first.');
      return;
    }

    navigator.clipboard.writeText(this.generatedText)
      .then(() => {
        alert('Work Order Template copied successfully!');
      })
      .catch(() => {
        alert('Unable to copy the template.');
      });
  }

  /**
   * Clear everything
   */
  clearForm(): void {

    this.responseTimeEnabled = true;

    this.damagedItem = '';
    this.replacementPart = '';

    this.adpEnabled = false;

    this.parts = [
      {
        partNumber: '',
        quantity: '1',
        description: ''
      }
    ];

    this.generatedText = '';
  }
}