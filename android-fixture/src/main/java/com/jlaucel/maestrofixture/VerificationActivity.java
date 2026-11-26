package com.jlaucel.maestrofixture;

import android.app.Activity;
import android.os.Bundle;
import android.text.InputType;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

public final class VerificationActivity extends Activity {
    private static final String FIXTURE_CODE = "2468";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        LinearLayout form = new LinearLayout(this);
        form.setOrientation(LinearLayout.VERTICAL);
        int padding = Math.round(TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, 24, getResources().getDisplayMetrics()));
        form.setPadding(padding, padding, padding, padding);
        form.setFocusableInTouchMode(true);

        TextView heading = new TextView(this);
        heading.setText(R.string.heading);
        heading.setTextSize(24);
        form.addView(heading);

        EditText pin = new EditText(this);
        pin.setId(R.id.qa_pin);
        pin.setInputType(InputType.TYPE_CLASS_NUMBER);
        pin.setHint(R.string.pin_hint);
        form.addView(pin);

        Button submit = new Button(this);
        submit.setId(R.id.qa_submit);
        submit.setText(R.string.submit);
        form.addView(submit);

        TextView result = new TextView(this);
        result.setTextSize(18);
        result.setVisibility(View.GONE);
        form.addView(result);
        submit.setOnClickListener(view -> {
            boolean accepted = FIXTURE_CODE.contentEquals(pin.getText());
            result.setId(accepted ? R.id.qa_accepted : R.id.qa_rejected);
            result.setText(accepted ? R.string.accepted : R.string.rejected);
            result.setVisibility(View.VISIBLE);
        });

        setContentView(form);
        form.requestFocus();
    }
}
