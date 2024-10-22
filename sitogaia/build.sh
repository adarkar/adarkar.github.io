#!/bin/bash

for a in tpl-datifilm-*
do
  f=$a
  a=${a#tpl-datifilm-}
  a=${a%.html}
  echo building $a...
  
  t=$(echo $a | tr a-z A-Z)

  t2=$(echo $a | perl -lpe's/^(.)/\U$1/')
  if [ $a = "piuvisti" ]
  then
    t2="I PIÙ VISTI"
  fi
  if [ $a = "oscar" ]
  then
    t2="PREMI OSCAR"
  fi


  x=$a.html
  
  cat tpl.html | perl -lne'//../%%DATA%%/ and print' | sed -e'/%%DATA%%/d' | sed -e"s/%%TITOLO%%/$t2/" >$x
  cat $f >>$x
  cat tpl.html | perl -lne'/%%DATA%%/..(1) and print' | sed -e'/%%DATA%%/d' >>$x
  if [ $a = "oscar" ]
  then
    sed -e's/%%OSCAR%%/oscar:true/' -i "" $x
  else
    sed -e's/%%OSCAR%%/oscar:false/' -i "" $x
  fi
done
