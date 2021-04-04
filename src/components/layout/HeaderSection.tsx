import React from 'react';
import { COLORS } from '../../constants/Colors';

export default function HeaderSection({ title }: { title: string }) {
  return (
    <div
      style={{
        textAlign: 'left',
        color: 'white',
        fontSize: 45,
        backgroundColor: COLORS.primaryBackground,
        fontWeight: 'bold',
        paddingLeft: 60,
        textTransform: 'capitalize',
        paddingTop: 10,
        marginBottom: 50,
        alignSelf: 'flex-start',
      }}
    >
      {title}
    </div>
  );
}
/*COLORS.primaryBackground*/
