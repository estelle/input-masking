/**
 * @jsx React.DOM
 */
var React = require('react');

var maskedInput = React.createClass({

  handleChange: function (e) {
        e.target.value = this.handleCurrentValue(e);
        document.getElementById(this.props.id + 'Mask').innerHTML = this.setValueOfMask(e);
  },

  handleCurrentValue : function (e) {
    var isCharsetPresent = e.target.getAttribute('data-charset'),
        maskedNumber = 'XMDY',
        maskedLetter = '_',
        placeholder = isCharsetPresent || e.target.getAttribute('data-placeholder'),
        value = e.target.value, l = placeholder.length, newValue = '',
        i, j, isInt, isLetter, strippedValue, matchesNumber, matchesLetter;

    // strip special characters
    strippedValue = isCharsetPresent ? value.replace(/\W/g, "") : value.replace(/\D/g, "");

    for (i = 0, j = 0; i < l; i++) {
        isInt = !isNaN(parseInt(strippedValue[j]));
        isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
        matchesNumber = (maskedNumber.indexOf(placeholder[i]) >= 0);
        matchesLetter = (maskedLetter.indexOf(placeholder[i]) >= 0);
        if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {
                newValue += strippedValue[j++];
          } else if ((!isCharsetPresent && !isInt && matchesNumber) || (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))) {
                //this.options.onError( e ); // write your own error handling function
                return newValue;
        } else {
            newValue += placeholder[i];
        }
        // break if no characters left and the pattern is non-special character
        if (strippedValue[j] == undefined) {
          break;
        }
    }

    if (this.props['data-valid-example']) {
      return this.validateProgress(e, newValue);
    }
    
    return newValue;
  },

  setValueOfMask : function (e) {
    var value = e.target.value,
        placeholder = e.target.getAttribute('data-placeholder');

    return "<i>" + value + "</i>" + placeholder.substr(value.length);
  },

  validateProgress : function (e, value) {
      var validExample = this.props['data-valid-example'],
          pattern = new RegExp(this.props.pattern),
          placeholder = e.target.getAttribute('data-placeholder'),
          l = value.length, testValue = '', i;

      //convert to months
      if ((l == 1) && (placeholder.toUpperCase().substr(0,2) == 'MM')) {
        if(value > 1 && value < 10) {
          value = '0' + value;
        }
        return value;
      }

    for ( i = l; i >= 0; i--) {
        testValue = value + validExample.substr(value.length);
        if (pattern.test(testValue)) {
          return value;
        } else {
          value = value.substr(0, value.length-1);
        }
    }

      return value;
    },

    handleBlur: function (e) {
      var currValue = e.target.value,
          pattern;
        
      // if value is empty, remove label parent class
      if(currValue.length == 0) {

        if(e.target.required) {
          this.updateLabelClass(e, "required", true);
          this.handleError(e, 'required');
        }

      } else {
        pattern = new RegExp('^' + this.props.pattern + '$');
        
        if(pattern.test(currValue)) {
          this.updateLabelClass(e, "good", true);
        } else {
          this.updateLabelClass(e, "error", true);
          this.handleError(e, 'invalidValue');
        }

      }
    },

    handleFocus: function (e) {
        this.updateLabelClass(e, 'focus', false);
    },

    updateLabelClass: function (e, className, replaceExistingClass) {
       var parentLI = e.target.parentNode.parentNode,
           pastClasses = ['error', 'required', 'focus', 'good'],
           i;

       if (replaceExistingClass) {
           for(i = 0; i < pastClasses.length; i++) {
                parentLI.classList.remove(pastClasses[i]);
           }
       }

       parentLI.classList.add(className);
    },

    handleError: function (e, errorMsg) {
        // the event and errorMsg name are passed. Label is already handled. What else do we do with error?
        //var possibleErrorMsgs = ['invalidValue', 'required'];
        return true; 
    },

    render: function () {
        var value = this.props.value || '',
            props = {
                 type: (this.props && this.props.type) || '' ,
                 id: this.props.id,
                 placeholder: this.props.placeholder,
                 className: "masked " + (this.props.className || ''),
                 pattern: this.props.pattern,
                 maxLength: this.props.pattern.length,
                 title: this.props.title,
                 label: this.props.label,
                 dataCharset: this.props['data-charset'],
                 required: this.props.required
             };

        return (
          <span className="maskShell">
               <span 
                aria-hidden="true" 
                id={props.id + 'Mask'}><i>{value}</i>{props.placeholder}</span>
               <input 
               id={props.id} 
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
               name={props.id}
               type={props.type}  
               className={props.className} 
               data-placeholder={props.placeholder}
               data-pattern={props.pattern} 
               data-valid-example={props.example}
               aria-required={props.required} 
               data-charset={props.dataCharset}
               required={props.required}
               title={props.title}/>
            </span>
        );
    }
});


module.exports = maskedInput;
