import React from 'react'
import "./AiInput.css"

function AiInput() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.input;
    const value = input.value.trim();
    if (value) {
      console.log("Submitted:", value);
      input.value = "";
      input.style.height = "auto";
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  };

  return (
    <>
      <form className="ai_input" onSubmit={handleSubmit}>
        <textarea
          id="input"
          rows={1}
          placeholder="Ask anything..."
          onInput={(e) => {
            const el = e.target;
            el.style.height = "auto";
            const maxHeight = 300 - 32;
            el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
          }}
          onKeyDown={handleKeyDown}
        />
        <div className="ai_button_area">
          <div className='ai_button_area' style={{width : "fit-content"}}>
            <button type='file'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 8.00049V6.00049C8 3.79135 9.79086 2.00049 12 2.00049C14.2091 2.00049 16 3.79135 16 6.00049V18.0005C16 20.2096 14.2091 22.0005 12 22.0005C9.79086 22.0005 8 20.2096 8 18.0005V13.5005C8 12.1198 9.11929 11.0005 10.5 11.0005C11.8807 11.0005 13 12.1198 13 13.5005V16.0005" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="1.5" />
                <path d="M12 22C14.2091 22 16 17.5228 16 12C16 6.47715 14.2091 2 12 2C9.79086 2 8 6.47715 8 12C8 17.5228 9.79086 22 12 22Z" stroke="white" stroke-width="1.5" />
                <path d="M2 12H22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M19.7071 7.2929C19.4142 7 18.9428 7 18 7C17.0572 7 16.5858 7 16.2929 7.2929M19.7071 7.2929C20 7.5858 20 8.0572 20 9C20 9.9428 20 10.4142 19.7071 10.7071M16.2929 7.2929C16 7.5858 16 8.0572 16 9C16 9.9428 16 10.4142 16.2929 10.7071M16.2929 10.7071C16.5858 11 17.0572 11 18 11C18.9428 11 19.4142 11 19.7071 10.7071" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 9H10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10 9H15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.2929 15.7071C5.5858 16 6.0572 16 7 16C7.9428 16 8.4142 16 8.7071 15.7071M5.2929 15.7071C5 15.4142 5 14.9428 5 14C5 13.0572 5 12.5858 5.2929 12.2929M8.7071 15.7071C9 15.4142 9 14.9428 9 14C9 13.0572 9 12.5858 8.7071 12.2929M8.7071 12.2929C8.4142 12 7.9428 12 7 12C6.0572 12 5.5858 12 5.2929 12.2929" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20 14L15 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 14L10 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            
          </div>
          <button type="submit">
            <svg viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
              <defs />
              <path fill="#ffffffff" d="M11.171,13.174 C11.121,13.15 11.073,13.119 11.028,13.083 C10.913,13.024 10.739,12.957 10.465,12.88 C10.152,12.792 9.678,12.696 9.08,12.574 L9.08,12.574 C8.896,12.536 8.701,12.497 8.495,12.454 C7.643,12.278 6.653,12.06 5.712,11.779 C4.78,11.501 3.843,11.147 3.123,10.676 C2.418,10.215 1.756,9.528 1.75,8.556 C1.748,8.185 1.921,7.878 2.086,7.662 C2.259,7.436 2.489,7.223 2.741,7.026 C3.247,6.629 3.944,6.216 4.746,5.808 C6.359,4.989 8.513,4.133 10.722,3.422 C12.93,2.711 15.229,2.133 17.131,1.884 C18.08,1.759 18.961,1.712 19.697,1.783 C20.397,1.851 21.13,2.039 21.597,2.543 C22.051,3.031 22.2,3.766 22.239,4.465 C22.28,5.202 22.206,6.082 22.057,7.03 C21.758,8.931 21.137,11.217 20.392,13.41 C19.646,15.603 18.765,17.735 17.933,19.325 C17.519,20.116 17.103,20.801 16.707,21.295 C16.51,21.541 16.298,21.767 16.072,21.934 C15.857,22.094 15.544,22.265 15.168,22.249 C14.564,22.222 14.105,21.891 13.768,21.453 C13.444,21.034 13.189,20.465 12.962,19.807 C12.507,18.489 12.08,16.545 11.529,14.039 C11.41,13.501 11.311,13.318 11.221,13.222 C11.207,13.206 11.191,13.19 11.171,13.174 Z M3.278,8.573 C3.268,8.586 3.26,8.598 3.254,8.607 C3.28,8.817 3.443,9.092 3.944,9.421 C4.481,9.772 5.253,10.077 6.14,10.342 C7.017,10.603 7.956,10.81 8.799,10.985 C8.98,11.023 9.159,11.059 9.333,11.094 L9.333,11.094 C9.946,11.219 10.499,11.332 10.87,11.436 C11.035,11.482 11.195,11.532 11.35,11.59 L14.47,8.47 C14.763,8.177 15.237,8.177 15.53,8.47 C15.823,8.763 15.823,9.237 15.53,9.53 L12.554,12.507 C12.776,12.86 12.896,13.274 12.994,13.717 C13.554,16.264 13.961,18.102 14.38,19.318 C14.59,19.927 14.783,20.313 14.956,20.538 C15.053,20.663 15.123,20.714 15.17,20.735 L15.177,20.73 C15.26,20.669 15.381,20.552 15.536,20.358 C15.845,19.972 16.209,19.385 16.604,18.629 C17.39,17.127 18.243,15.07 18.972,12.927 C19.7,10.783 20.294,8.584 20.575,6.797 C20.716,5.901 20.774,5.137 20.741,4.548 C20.706,3.921 20.576,3.647 20.498,3.563 C20.421,3.48 20.166,3.335 19.553,3.276 C18.976,3.221 18.22,3.254 17.326,3.371 C15.545,3.605 13.34,4.155 11.182,4.85 C9.025,5.544 6.949,6.371 5.426,7.146 C4.661,7.535 4.062,7.897 3.666,8.207 C3.467,8.362 3.345,8.486 3.278,8.573 Z M15.121,20.766 L15.125,20.764 C15.123,20.765 15.121,20.766 15.121,20.766 Z" />
            </svg>
          </button>

        </div>
      </form>

    </>
  )
}

export default AiInput