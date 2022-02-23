import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { color_white, color_fifth } from '../../styles/Colors';

function Pagination(props) {
  const [pages, setpages] = useState([]);
  const [page, setpage] = useState(props.page);
  const size = 20
  const maxPages = props.lastPage

  useEffect(() => {
    if (pages.length === 0) {
      let n = 0
      let position = []
      while (n < maxPages) {
        n++
        position.push(n)
      }
      setpages(position)
    }
  }, [maxPages]);

  useEffect(() => {
    if (pages.length > 0) {
      props.getPage(page)
    }
  }, [page]);

  function newPage(e) {
    let value = page + e
    console.log(maxPages, "_____", value)
    if (value < 1) {
      setpage(1)
    }
    else {
      if (value > maxPages) {
        setpage(maxPages)
      }
      else {
        setpage(value)
      }
    }
  }

  return (
    <View style={{ width: "100%", padding: 20}}>
      <View style={{ width: "100%", paddingHorizontal: "5%", justifyContent: "center", flexDirection: "row" }}>
        {page !== 1 &&
          <TouchableOpacity style={styles.btn} onPress={() => setpage(1)}>
            <Icon name='arrowhead-left' fill={color_fifth} width={size} height={size} />
          </TouchableOpacity>
        }
        {page !== 1 &&
          <TouchableOpacity style={styles.btn} onPress={() => newPage(-1)}>
            <Icon name='arrow-ios-back' fill={color_fifth} width={size} height={size} />
          </TouchableOpacity>
        }
        {
          pages.map((i, key) => {
            if (i > page - 2 && i < page + 2) {
              return (
                <TouchableOpacity key={key} onPress={() => setpage(i)}>
                  <Text style={[styles.text, {
                    borderColor: page === i ? color_fifth : color_white,
                    borderWidth: page === i ? 1 : 0,
                    color: page === i ? color_fifth : color_fifth
                  }]}>{i}</Text>
                </TouchableOpacity>
              )
            }
          })
        }
        {page < maxPages &&
          <TouchableOpacity style={styles.btn} onPress={() => newPage(+1)}>
            <Icon name='arrow-ios-forward' fill={color_fifth} width={size} height={size} />
          </TouchableOpacity>
        }
        {
          page < maxPages &&
          <TouchableOpacity style={styles.btn} onPress={() => setpage(maxPages)}>
            <Icon name='arrowhead-right' fill={color_fifth} width={size} height={size} />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: color_white,
    borderRadius: 40,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginHorizontal: 5,
  },
  text: {
    backgroundColor: color_white,
    borderRadius: 40,
    width: 40,
    height: 40,
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
  }
})

export default Pagination;